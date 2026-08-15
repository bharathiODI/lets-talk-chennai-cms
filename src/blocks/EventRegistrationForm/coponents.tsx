'use client'

import React, { useCallback, useState } from 'react'
import Image from 'next/image'
import axios from 'axios'
import { motion, AnimatePresence } from 'framer-motion'
import { toast, ToastContainer } from 'react-toastify'
import { render } from '@react-email/render'
import { CheckCircle2, Sparkles, X } from 'lucide-react'

import SummerFestRegistrationEmail from '@/components/Summer/SummerFestRegistrationEmail'

/* =========================================================
   TYPES
========================================================= */

interface CustomFieldOption {
  label: string
  value: string
}

interface CustomField {
  id?: number | string
  label: string
  name: string
  type: string
  required?: boolean
  placeholder?: string
  options?: CustomFieldOption[]
}

type Props = {
  block: any
  eventData: any
}

/* =========================================================
   HELPERS
========================================================= */

const normalizeFieldName = (name?: string) => name?.trim()?.toLowerCase() || ''

const getFieldValue = (formData: Record<string, any>, fieldName: string) =>
  formData[normalizeFieldName(fieldName)]

const setFieldValue = (prev: Record<string, any>, fieldName: string, value: any) => ({
  ...prev,
  [normalizeFieldName(fieldName)]: value,
})

const WaveDecoration = () => (
  <span className="mx-2 inline-block font-serif text-lg tracking-widest text-[#007A87] opacity-60">
    ~~~
  </span>
)

/* =========================================================
   COMPONENT
========================================================= */

const EventRegistrationBlockComponent: React.FC<Props> = ({ block, eventData }) => {
  const [formData, setFormData] = useState<Record<string, any>>({})
  const [loading, setLoading] = useState(false)
  const [otp, setOtp] = useState('')
  const [generatedOtp, setGeneratedOtp] = useState('')
  const [otpVerified, setOtpVerified] = useState(false)
  const [sendingOtp, setSendingOtp] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  const showImage = Boolean(block?.showImage && block?.sideImage?.url)
  const sideImage = block?.sideImage
  const imagePosition = block?.imagePosition || 'left'

  /* =========================================================
     EVENT DATA & SETTINGS (FIXED FOR DIRECT ACCESS)
  ========================================================= */

  const registrationSettings = eventData?.regSettings || eventData?.formSettings?.regSettings || {}

  const customFields: CustomField[] = Array.isArray(eventData?.customFields)
    ? eventData.customFields
    : Array.isArray(eventData?.formSettings?.customFields)
      ? eventData.formSettings.customFields
      : []

  const title = eventData?.eventFields?.title || eventData?.title || 'Event'
  const isRegistrationOpen = registrationSettings?.isRegistrationOpen ?? true
  const enableOTP = registrationSettings?.enableOTP ?? false
  const thankYouMessage = registrationSettings?.thankYouMessage || ''

  /* =========================================================
     FORM HANDLING
  ========================================================= */

  const handleChange = useCallback((fieldName: string, value: any) => {
    setFormData((prev) => setFieldValue(prev, fieldName, value))
  }, [])

  const validateForm = (): boolean => {
    for (const field of customFields) {
      const value = getFieldValue(formData, field.name)

      if (field.required && (!value || value === '')) {
        toast.error(`${field.label} is required`)
        return false
      }

      if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(value)) {
          toast.error('Enter valid email')
          return false
        }
      }
    }
    return true
  }

  /* =========================================================
     OTP LOGIC
  ========================================================= */

  const mobileField = customFields.find(
    (field) =>
      field.type === 'number' ||
      normalizeFieldName(field.name).includes('mobile') ||
      normalizeFieldName(field.name).includes('phone'),
  )

  const sendOtpToMobile = async () => {
    try {
      if (!mobileField) {
        toast.error('Mobile number field is required for OTP verification')
        return
      }

      const mobile = getFieldValue(formData, mobileField.name)
      if (!mobile || String(mobile).length < 10) {
        toast.error('Enter a valid 10-digit mobile number')
        return
      }

      setSendingOtp(true)
      const newOtp = Math.floor(100000 + Math.random() * 900000).toString()
      setGeneratedOtp(newOtp)

      await axios.post('/api/send-otp', { mobile, otp: newOtp })
      toast.success('OTP sent successfully')
    } catch {
      toast.error('Failed to send OTP')
    } finally {
      setSendingOtp(false)
    }
  }

  const verifyOtp = () => {
    if (otp === generatedOtp) {
      setOtpVerified(true)
      toast.success('OTP verified successfully')
    } else {
      toast.error('Invalid OTP')
    }
  }

  /* =========================================================
     SUBMIT HANDLER
  ========================================================= */

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (loading || !validateForm()) return

    if (enableOTP && !otpVerified) {
      toast.error('Please verify your OTP before submitting')
      return
    }

    try {
      setLoading(true)

      const emailHtml = await render(
        <SummerFestRegistrationEmail
          title={title}
          values={formData}
          thankYouMessage={thankYouMessage}
        />,
      )

      const payload = new FormData()
      payload.append('eventId', String(eventData?.id))
      payload.append('slug', String(eventData?.slug))
      payload.append('emailTemplate', emailHtml)

      const serializedValues: Record<string, any> = {}

      customFields.forEach((field) => {
        const value = getFieldValue(formData, field.name)
        if (field.type === 'file') {
          if (value instanceof File) {
            payload.append(normalizeFieldName(field.name), value)
          }
        } else {
          serializedValues[normalizeFieldName(field.name)] = value
        }
      })

      payload.append('values', JSON.stringify(serializedValues))

      await axios.post('/api/summer-registration', payload, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })

      toast.success('Registration submitted successfully')
      setShowSuccessModal(true)

      setFormData({})
      setOtp('')
      setGeneratedOtp('')
      setOtpVerified(false)
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  /* =========================================================
     FIELD RENDERER
  ========================================================= */

  const renderField = (field: CustomField) => {
    const fieldName = normalizeFieldName(field.name)
    const commonClass =
      'w-full rounded-xl border border-gray-300 bg-white px-5 py-4 outline-none transition-all focus:border-orange-500 mt-2'

    switch (field.type) {
      case 'textarea':
        return (
          <textarea
            name={fieldName}
            placeholder={field.placeholder || `Enter ${field.label}`}
            required={field.required}
            rows={4}
            value={getFieldValue(formData, field.name) || ''}
            onChange={(e) => handleChange(field.name, e.target.value)}
            className={commonClass}
          />
        )

      case 'select':
        return (
          <select
            name={fieldName}
            required={field.required}
            value={getFieldValue(formData, field.name) || ''}
            onChange={(e) => handleChange(field.name, e.target.value)}
            className={commonClass}
          >
            <option value="">Select {field.label}</option>
            {field.options?.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )

      case 'email':
        return (
          <input
            type="email"
            name={fieldName}
            placeholder={field.placeholder || 'Enter your Email'}
            required={field.required}
            value={getFieldValue(formData, field.name) || ''}
            onChange={(e) => handleChange(field.name, e.target.value)}
            className={commonClass}
          />
        )

      case 'number':
        return (
          <input
            type="tel"
            inputMode="numeric"
            name={fieldName}
            placeholder={field.placeholder || 'Enter Mobile Number'}
            required={field.required}
            value={getFieldValue(formData, field.name) || ''}
            onChange={(e) => handleChange(field.name, e.target.value.replace(/\D/g, ''))}
            className={commonClass}
          />
        )

      case 'file':
        return (
          <input
            type="file"
            name={fieldName}
            required={field.required}
            onChange={(e) => handleChange(field.name, e.target.files?.[0] || null)}
            className={commonClass}
          />
        )

      default:
        return (
          <input
            type="text"
            name={fieldName}
            placeholder={field.placeholder || `Enter ${field.label}`}
            required={field.required}
            value={getFieldValue(formData, field.name) || ''}
            onChange={(e) => handleChange(field.name, e.target.value)}
            className={commonClass}
          />
        )
    }
  }

  if (!isRegistrationOpen || block?.showForm === false) return null

  return (
    <>
      <ToastContainer position="top-center" />

      <section className="relative overflow-hidden bg-white py-12">
        <div className="relative z-10">
          {/* HEADING HEADER */}
          <div className="mb-12 text-center">
            <h2 className="festmainheadingsss mb-0 mt-0 flex items-center justify-center gap-2 text-sm font-extrabold uppercase tracking-widest text-[#005B70]">
              <WaveDecoration />
              {block?.sectionTitle || 'Register'}
              <WaveDecoration />
            </h2>

            <div className="mt-3 flex items-center justify-center">
              <div className="h-1 w-20 rounded bg-[#FCBA13]" />
            </div>
          </div>

          {/* MAIN CONTAINER */}
          <div className={`px-4 ${showImage ? 'mx-auto max-w-7xl' : 'mx-auto max-w-3xl'}`}>
            <div
              className={`overflow-hidden rounded-[30px] border border-gray-100 bg-white shadow-2xl ${
                showImage ? 'grid items-stretch lg:grid-cols-2' : ''
              }`}
            >
              {/* LEFT IMAGE */}
              {showImage && imagePosition === 'left' && (
                <div className="relative h-[320px] self-stretch lg:min-h-full">
                  <Image
                    src={sideImage.url}
                    alt={sideImage.alt || title}
                    fill
                    priority
                    className="object-cover"
                  />
                </div>
              )}

              {/* FORM SECTION */}
              <div className="p-8 lg:p-12">
                {block?.sectionSubTitle && (
                  <span className="text-xs font-bold uppercase tracking-wider text-orange-500">
                    {block.sectionSubTitle}
                  </span>
                )}

                <h3 className="mt-1 text-2xl font-bold text-gray-900">
                  {block?.sectionTitle || 'Register Now'}
                </h3>

                {block?.sectionDescrption && (
                  <p className="mt-2 text-sm text-gray-600">{block.sectionDescrption}</p>
                )}

                <form onSubmit={submitForm} className="mt-8 space-y-6">
                  {customFields.map((field, idx) => (
                    <div key={field.id || idx}>
                      <label className="block text-sm font-semibold text-gray-700">
                        {field.label} {field.required && <span className="text-red-500">*</span>}
                      </label>
                      {renderField(field)}
                    </div>
                  ))}

                  {/* OTP SECTION */}
                  {enableOTP && (
                    <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6 space-y-4">
                      <div className="flex items-center justify-between gap-4">
                        <button
                          type="button"
                          onClick={sendOtpToMobile}
                          disabled={sendingOtp || otpVerified}
                          className="rounded-xl bg-gray-900 px-5 py-3 text-xs font-bold text-white transition-all hover:bg-gray-800 disabled:opacity-50"
                        >
                          {sendingOtp ? 'Sending...' : otpVerified ? 'OTP Verified' : 'Send OTP'}
                        </button>
                      </div>

                      {generatedOtp && !otpVerified && (
                        <div className="flex gap-3">
                          <input
                            type="text"
                            placeholder="Enter 6-digit OTP"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-orange-500"
                          />
                          <button
                            type="button"
                            onClick={verifyOtp}
                            className="rounded-xl bg-orange-500 px-6 py-3 text-xs font-bold text-white transition-all hover:bg-orange-600"
                          >
                            Verify
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  {/* SUBMIT BUTTON */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-xl bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-400 py-4 text-sm font-bold uppercase tracking-wider text-white shadow-xl transition-all hover:scale-[1.02] disabled:opacity-50"
                  >
                    {loading ? 'Submitting...' : 'Complete Registration'}
                  </button>
                </form>
              </div>

              {/* RIGHT IMAGE */}
              {showImage && imagePosition === 'right' && (
                <div className="relative h-[320px] self-stretch lg:min-h-full">
                  <Image
                    src={sideImage.url}
                    alt={sideImage.alt || title}
                    fill
                    priority
                    className="object-cover"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* SUCCESS MODAL */}
      <AnimatePresence>
        {showSuccessModal && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-md px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="relative overflow-hidden rounded-[35px] bg-white p-10 text-center max-w-xl w-full shadow-2xl"
            >
              <button
                onClick={() => setShowSuccessModal(false)}
                className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100"
              >
                <X className="h-5 w-5 text-black" />
              </button>

              <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-yellow-300 text-white shadow-xl">
                <CheckCircle2 className="h-12 w-12" />
              </div>

              <div className="mt-6">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Sparkles className="h-5 w-5 text-orange-500" />
                  <span className="text-xs font-bold uppercase tracking-widest text-orange-500">
                    Registration Successful
                  </span>
                </div>
                <h2 className="text-3xl font-black text-gray-900">Thank You!</h2>
                <p className="mt-4 text-sm text-gray-600">
                  Your registration for <span className="font-bold text-orange-500">{title}</span>{' '}
                  has been received.
                </p>
              </div>

              <button
                onClick={() => setShowSuccessModal(false)}
                className="mt-8 rounded-full bg-orange-500 px-8 py-3 text-xs font-bold uppercase tracking-wider text-white transition-all hover:bg-orange-600"
              >
                Continue
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}

export default EventRegistrationBlockComponent

// 'use client'

// import React, { useCallback, useState } from 'react'
// import Image from 'next/image'
// import axios from 'axios'
// import { motion, AnimatePresence } from 'framer-motion'
// import { toast, ToastContainer } from 'react-toastify'
// import { render } from '@react-email/render'
// import { CheckCircle2, Sparkles, X } from 'lucide-react'

// import SummerFestRegistrationEmail from '@/components/Summer/SummerFestRegistrationEmail'

// /* =========================================================
//    TYPES
// ========================================================= */

// interface CustomFieldOption {
//   label: string
//   value: string
// }

// interface CustomField {
//   id?: number | string
//   label: string
//   name: string
//   type: string
//   required?: boolean
//   placeholder?: string
//   options?: CustomFieldOption[]
// }

// type Props = {
//   block: any
//   eventData: any
// }

// /* =========================================================
//    HELPERS
// ========================================================= */

// const normalizeFieldName = (name?: string) => name?.trim()?.toLowerCase() || ''

// const getFieldValue = (formData: Record<string, any>, fieldName: string) =>
//   formData[normalizeFieldName(fieldName)]

// const setFieldValue = (prev: Record<string, any>, fieldName: string, value: any) => ({
//   ...prev,
//   [normalizeFieldName(fieldName)]: value,
// })

// const WaveDecoration = () => (
//   <span className="mx-2 inline-block font-serif text-lg tracking-widest text-[#007A87] opacity-60">
//     ~~~
//   </span>
// )

// /* =========================================================
//    COMPONENT
// ========================================================= */

// const EventRegistrationBlockComponent: React.FC<Props> = ({ block, eventData }) => {
//   const [formData, setFormData] = useState<Record<string, any>>({})
//   const [loading, setLoading] = useState(false)
//   const [otp, setOtp] = useState('')
//   const [generatedOtp, setGeneratedOtp] = useState('')
//   const [otpVerified, setOtpVerified] = useState(false)
//   const [sendingOtp, setSendingOtp] = useState(false)
//   const [showSuccessModal, setShowSuccessModal] = useState(false)

//   const showImage = Boolean(block?.showImage && block?.sideImage?.url)
//   const sideImage = block?.sideImage
//   const imagePosition = block?.imagePosition || 'left'

//   /* =========================================================
//      EVENT DATA & SETTINGS
//   ========================================================= */

//   const registrationSettings = eventData?.formSettings?.regSettings || {}
//   const customFields: CustomField[] = Array.isArray(eventData?.formSettings?.customFields)
//     ? eventData.formSettings.customFields
//     : []

//   const title = eventData?.eventFields?.title || eventData?.title || 'Event'
//   const isRegistrationOpen = registrationSettings?.isRegistrationOpen ?? false
//   const enableOTP = registrationSettings?.enableOTP ?? false
//   const thankYouMessage = registrationSettings?.thankYouMessage || ''

//   /* =========================================================
//      FORM HANDLING
//   ========================================================= */

//   const handleChange = useCallback((fieldName: string, value: any) => {
//     setFormData((prev) => setFieldValue(prev, fieldName, value))
//   }, [])

//   const validateForm = (): boolean => {
//     for (const field of customFields) {
//       const value = getFieldValue(formData, field.name)

//       if (field.required && (!value || value === '')) {
//         toast.error(`${field.label} is required`)
//         return false
//       }

//       if (field.type === 'email' && value) {
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
//         if (!emailRegex.test(value)) {
//           toast.error('Enter valid email')
//           return false
//         }
//       }
//     }
//     return true
//   }

//   /* =========================================================
//      OTP LOGIC
//   ========================================================= */

//   const mobileField = customFields.find(
//     (field) =>
//       field.type === 'number' ||
//       normalizeFieldName(field.name).includes('mobile') ||
//       normalizeFieldName(field.name).includes('phone'),
//   )

//   const sendOtpToMobile = async () => {
//     try {
//       if (!mobileField) {
//         toast.error('Mobile number field is required for OTP verification')
//         return
//       }

//       const mobile = getFieldValue(formData, mobileField.name)
//       if (!mobile || String(mobile).length < 10) {
//         toast.error('Enter a valid 10-digit mobile number')
//         return
//       }

//       setSendingOtp(true)
//       const newOtp = Math.floor(100000 + Math.random() * 900000).toString()
//       setGeneratedOtp(newOtp)

//       await axios.post('/api/send-otp', { mobile, otp: newOtp })
//       toast.success('OTP sent successfully')
//     } catch {
//       toast.error('Failed to send OTP')
//     } finally {
//       setSendingOtp(false)
//     }
//   }

//   const verifyOtp = () => {
//     if (otp === generatedOtp) {
//       setOtpVerified(true)
//       toast.success('OTP verified successfully')
//     } else {
//       toast.error('Invalid OTP')
//     }
//   }

//   /* =========================================================
//      SUBMIT HANDLER
//   ========================================================= */

//   const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault()

//     if (loading || !validateForm()) return

//     if (enableOTP && !otpVerified) {
//       toast.error('Please verify your OTP before submitting')
//       return
//     }

//     try {
//       setLoading(true)

//       const emailHtml = await render(
//         <SummerFestRegistrationEmail
//           title={title}
//           values={formData}
//           thankYouMessage={thankYouMessage}
//         />,
//       )

//       const payload = new FormData()
//       payload.append('eventId', String(eventData?.id))
//       payload.append('slug', String(eventData?.slug))
//       payload.append('emailTemplate', emailHtml)

//       const serializedValues: Record<string, any> = {}

//       customFields.forEach((field) => {
//         const value = getFieldValue(formData, field.name)
//         if (field.type === 'file') {
//           if (value instanceof File) {
//             payload.append(normalizeFieldName(field.name), value)
//           }
//         } else {
//           serializedValues[normalizeFieldName(field.name)] = value
//         }
//       })

//       payload.append('values', JSON.stringify(serializedValues))

//       await axios.post('/api/summer-registration', payload, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//       })

//       toast.success('Registration submitted successfully')
//       setShowSuccessModal(true)

//       // Reset form state
//       setFormData({})
//       setOtp('')
//       setGeneratedOtp('')
//       setOtpVerified(false)
//     } catch (error: any) {
//       toast.error(error?.response?.data?.message || 'Registration failed')
//     } finally {
//       setLoading(false)
//     }
//   }

//   /* =========================================================
//      FIELD RENDERER
//   ========================================================= */

//   const renderField = (field: CustomField) => {
//     const fieldName = normalizeFieldName(field.name)
//     const commonClass =
//       'w-full rounded-xl border border-gray-300 bg-white px-5 py-4 outline-none transition-all focus:border-orange-500 mt-2'

//     switch (field.type) {
//       case 'textarea':
//         return (
//           <textarea
//             name={fieldName}
//             placeholder={field.placeholder || `Enter ${field.label}`}
//             required={field.required}
//             rows={4}
//             value={getFieldValue(formData, field.name) || ''}
//             onChange={(e) => handleChange(field.name, e.target.value)}
//             className={commonClass}
//           />
//         )

//       case 'select':
//         return (
//           <select
//             name={fieldName}
//             required={field.required}
//             value={getFieldValue(formData, field.name) || ''}
//             onChange={(e) => handleChange(field.name, e.target.value)}
//             className={commonClass}
//           >
//             <option value="">Select {field.label}</option>
//             {field.options?.map((option, index) => (
//               <option key={index} value={option.value}>
//                 {option.label}
//               </option>
//             ))}
//           </select>
//         )

//       case 'email':
//         return (
//           <input
//             type="email"
//             name={fieldName}
//             placeholder={field.placeholder || 'Enter your Email'}
//             required={field.required}
//             value={getFieldValue(formData, field.name) || ''}
//             onChange={(e) => handleChange(field.name, e.target.value)}
//             className={commonClass}
//           />
//         )

//       case 'number':
//         return (
//           <input
//             type="tel"
//             inputMode="numeric"
//             name={fieldName}
//             placeholder={field.placeholder || 'Enter Mobile Number'}
//             required={field.required}
//             value={getFieldValue(formData, field.name) || ''}
//             onChange={(e) => handleChange(field.name, e.target.value.replace(/\D/g, ''))}
//             className={commonClass}
//           />
//         )

//       case 'file':
//         return (
//           <input
//             type="file"
//             name={fieldName}
//             required={field.required}
//             onChange={(e) => handleChange(field.name, e.target.files?.[0] || null)}
//             className={commonClass}
//           />
//         )

//       default:
//         return (
//           <input
//             type="text"
//             name={fieldName}
//             placeholder={field.placeholder || `Enter ${field.label}`}
//             required={field.required}
//             value={getFieldValue(formData, field.name) || ''}
//             onChange={(e) => handleChange(field.name, e.target.value)}
//             className={commonClass}
//           />
//         )
//     }
//   }

//   if (!isRegistrationOpen || block?.showForm === false) return null

//   return (
//     <>
//       <ToastContainer position="top-center" />

//       <section className="relative overflow-hidden bg-white py-12">
//         <div className="relative z-10">
//           {/* HEADING HEADER */}
//           <div className="mb-12 text-center">
//             <h2 className="festmainheadingsss mb-0 mt-0 flex items-center justify-center gap-2 text-sm font-extrabold uppercase tracking-widest text-[#005B70]">
//               <WaveDecoration />
//               {block?.sectionTitle || 'Register'}
//               <WaveDecoration />
//             </h2>

//             <div className="mt-3 flex items-center justify-center">
//               <div className="h-1 w-20 rounded bg-[#FCBA13]" />
//             </div>
//           </div>

//           {/* MAIN CONTAINER */}
//           <div className={`px-4 ${showImage ? 'mx-auto max-w-7xl' : 'mx-auto max-w-3xl'}`}>
//             <div
//               className={`overflow-hidden rounded-[30px] border border-gray-100 bg-white shadow-2xl ${
//                 showImage ? 'grid items-stretch lg:grid-cols-2' : ''
//               }`}
//             >
//               {/* LEFT IMAGE */}
//               {showImage && imagePosition === 'left' && (
//                 <div className="relative h-[320px] self-stretch lg:min-h-full">
//                   <Image
//                     src={sideImage.url}
//                     alt={sideImage.alt || title}
//                     fill
//                     priority
//                     className="object-cover"
//                   />
//                 </div>
//               )}

//               {/* FORM SECTION */}
//               <div className="p-6 bg-white md:p-10 lg:p-14">
//                 <div className="mb-10 text-center">
//                   <div className="inline-flex items-center gap-2 rounded-full bg-orange-100 px-4 py-2">
//                     <Sparkles className="h-4 w-4 text-orange-500" />
//                     <span className="text-xs font-bold uppercase tracking-[3px] text-orange-500">
//                       Registration Form
//                     </span>
//                   </div>

//                   <h2 className="mt-5 text-4xl font-black leading-tight text-[#061E43]">
//                     {block?.sectionSubTitle || 'Submit Your Data'}
//                   </h2>

//                   <p className="mt-4 max-w-xl text-base leading-7 text-gray-500">
//                     {block?.sectionDescrption}
//                   </p>
//                 </div>

//                 <form onSubmit={submitForm} className="space-y-8">
//                   {/* DYNAMIC FIELDS GRID */}
//                   <div className="grid gap-6 md:grid-cols-2">
//                     {customFields.map((field, index) => (
//                       <div
//                         key={field.id || index}
//                         className={field.type === 'textarea' ? 'md:col-span-2' : ''}
//                       >
//                         <label className="text-sm font-semibold text-[#061E43]">
//                           {field.label}
//                           {field.required && <span className="ml-1 text-red-500">*</span>}
//                         </label>

//                         {renderField(field)}
//                       </div>
//                     ))}
//                   </div>

//                   {/* OTP SECTION */}
//                   {enableOTP && (
//                     <div className="space-y-4 rounded-2xl bg-orange-50/50 p-6 border border-orange-100">
//                       <div className="flex flex-col gap-4 md:flex-row md:items-center">
//                         <button
//                           type="button"
//                           onClick={sendOtpToMobile}
//                           disabled={sendingOtp || otpVerified}
//                           className="rounded-xl bg-orange-500 px-6 py-3.5 font-semibold text-white transition-all hover:bg-orange-600 disabled:opacity-60"
//                         >
//                           {sendingOtp
//                             ? 'Sending OTP...'
//                             : otpVerified
//                               ? 'OTP Verified'
//                               : 'Send OTP'}
//                         </button>

//                         {generatedOtp && !otpVerified && (
//                           <div className="flex flex-1 gap-3">
//                             <input
//                               type="text"
//                               placeholder="Enter 6-digit OTP"
//                               value={otp}
//                               onChange={(e) => setOtp(e.target.value)}
//                               className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-orange-500"
//                             />

//                             <button
//                               type="button"
//                               onClick={verifyOtp}
//                               className="rounded-xl bg-black px-6 py-3 font-semibold text-white"
//                             >
//                               Verify
//                             </button>
//                           </div>
//                         )}
//                       </div>

//                       {otpVerified && (
//                         <div className="flex items-center gap-2 text-sm font-semibold text-green-700">
//                           <CheckCircle2 className="h-5 w-5" /> OTP verified successfully
//                         </div>
//                       )}
//                     </div>
//                   )}

//                   {/* SUBMIT BUTTON */}
//                   <button
//                     type="submit"
//                     disabled={loading}
//                     className="w-full rounded-2xl bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 px-8 py-5 text-lg font-black text-white shadow-xl transition-all hover:scale-[1.01] disabled:opacity-60"
//                   >
//                     {loading ? 'Submitting...' : 'Submit Registration'}
//                   </button>
//                 </form>
//               </div>

//               {/* RIGHT IMAGE */}
//               {showImage && imagePosition === 'right' && (
//                 <div className="relative order-first h-[320px] lg:order-none lg:h-auto lg:min-h-[600px]">
//                   <Image
//                     src={sideImage.url}
//                     alt={sideImage.alt || title}
//                     fill
//                     priority
//                     className="object-cover"
//                   />
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* SUCCESS MODAL */}
//       <AnimatePresence>
//         {showSuccessModal && (
//           <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 px-4 backdrop-blur-md">
//             <motion.div
//               initial={{ opacity: 0, scale: 0.8, y: 50 }}
//               animate={{ opacity: 1, scale: 1, y: 0 }}
//               exit={{ opacity: 0, scale: 0.8 }}
//               transition={{ duration: 0.3 }}
//               className="relative w-full max-w-xl overflow-hidden rounded-[35px] bg-white p-10 text-center shadow-2xl"
//             >
//               <button
//                 onClick={() => setShowSuccessModal(false)}
//                 className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 transition-all hover:bg-gray-200"
//               >
//                 <X className="h-5 w-5 text-black" />
//               </button>

//               <div className="relative z-10 mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 via-amber-400 to-yellow-300 shadow-xl">
//                 <CheckCircle2 className="h-12 w-12 text-white" />
//               </div>

//               <div className="relative z-10 mt-6">
//                 <div className="mb-2 flex items-center justify-center gap-2">
//                   <Sparkles className="h-5 w-5 text-orange-500" />
//                   <span className="text-sm font-bold uppercase tracking-[4px] text-orange-500">
//                     Success
//                   </span>
//                 </div>

//                 <h2 className="text-3xl font-black text-[#061E43]">Thank You!</h2>

//                 <p className="mt-4 text-base leading-7 text-gray-600">
//                   Your registration for <span className="font-bold text-orange-500">{title}</span>{' '}
//                   has been successfully submitted.
//                 </p>
//               </div>

//               <div className="relative z-10 mt-8">
//                 <button
//                   onClick={() => setShowSuccessModal(false)}
//                   className="rounded-full bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-400 px-10 py-4 text-sm font-bold uppercase tracking-[2px] text-white shadow-lg transition-all hover:scale-105"
//                 >
//                   Continue
//                 </button>
//               </div>
//             </motion.div>
//           </div>
//         )}
//       </AnimatePresence>
//     </>
//   )
// }

// export default EventRegistrationBlockComponent
