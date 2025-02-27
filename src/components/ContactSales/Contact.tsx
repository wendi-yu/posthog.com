import { FormikErrors } from 'formik'
import React, { Dispatch, InputHTMLAttributes, SetStateAction, useRef, useState } from 'react'
import { useFormik } from 'formik'
import { button } from 'components/CallToAction'
import * as Yup from 'yup'
import { useLocation } from '@reach/router'
import Link from 'components/Link'
import { animateScroll as scroll } from 'react-scroll'
import { motion } from 'framer-motion'
import TextareaAutosize from 'react-textarea-autosize'
import Confetti from 'react-confetti'

const inputContainerClasses = `p-4 bg-tan group active:bg-white focus-within:bg-white relative text-left`

const fields: {
    name: string
    placeHolder: string
    Component: (props: InputHTMLAttributes<HTMLInputElement> & IInputProps) => JSX.Element
    hubspotField: string
    options?: { value?: string; hubspotValue: string | number; label?: string }[]
    type?: string
}[] = [
    {
        name: 'firstName',
        placeHolder: 'First name',
        Component: Input,
        hubspotField: 'firstname',
    },
    {
        name: 'lastName',
        placeHolder: 'Last name',
        Component: Input,
        hubspotField: 'lastname',
    },
    {
        name: 'workEmail',
        placeHolder: 'Work email',
        Component: Input,
        hubspotField: 'email',
    },
    {
        name: 'companyName',
        placeHolder: 'Company name',
        Component: Input,
        hubspotField: 'company',
    },
    {
        name: 'role',
        placeHolder: 'Role',
        Component: RadioGroup,
        options: [
            { value: 'Product Management', hubspotValue: 'product' },
            { value: 'Engineering', hubspotValue: 'engineering' },
            { value: 'Executive', hubspotValue: 'leadership' },
            { value: 'Marketing', hubspotValue: 'marketing' },
            { value: 'Sales', hubspotValue: 'sales' },
            { value: 'Other', hubspotValue: 'other' },
        ],
        hubspotField: 'icp___role_list',
    },
    {
        name: 'monthlyActiveUsers',
        placeHolder: 'How many monthly active users do you have?',
        Component: RadioGroup,
        options: [
            { label: 'Under 10k/mo', hubspotValue: 10_000 },
            { label: '10k-50k/mo', hubspotValue: 50_000 },
            { label: '50k-100k/mo', hubspotValue: 100_000 },
            { label: '100k-500k/mo', hubspotValue: 500_000 },
            { label: '500k-1m/mo', hubspotValue: 100_000_000 },
            { label: 'More than 1m/mo', hubspotValue: 100_000_000_000 },
        ],
        hubspotField: 'maus',
    },
    {
        name: 'monthlyEvents',
        placeHolder: 'How many events do you want to track (monthly)?',
        Component: RadioGroup,
        options: [
            { label: 'Under 1m/mo', hubspotValue: 1_000_000 },
            { label: '1m-2m/mo', hubspotValue: 2_000_000 },
            { label: '2m-10m/mo', hubspotValue: 10_000_000 },
            { label: '10m-100m/mo', hubspotValue: 100_000_000 },
            { label: 'More than 100m/mo', hubspotValue: 100_000_000_000 },
            { label: "I'm not sure!", hubspotValue: 0 },
        ],
        hubspotField: 'monthly_events',
    },
    {
        name: 'product',
        placeHolder: 'Which product are you interested in?',
        Component: RadioGroup,
        options: [
            {
                value: 'PostHog Cloud',
                hubspotValue: 'PostHog Cloud',
            },
            { value: 'PostHog Cloud Enterprise', hubspotValue: 'PostHog Cloud Enterprise' },
            { value: 'PostHog Open Source', hubspotValue: 'PostHog Free (Ideal for start-ups)' },
        ],
        hubspotField: 'which_product_are_you_interested_in_',
    },
    {
        name: 'personalizedDemo',
        placeHolder: 'Would you like a personalized demo of PostHog?',
        Component: RadioGroup,
        options: [
            { value: 'Yes', hubspotValue: 'Yes' },
            { value: 'No', hubspotValue: 'No' },
        ],
        hubspotField: 'personalizedDemo',
    },
    {
        name: 'details',
        placeHolder: 'Details',
        Component: TextArea,
        hubspotField: 'message',
    },
]
interface IInputProps {
    setFieldValue: (
        field: string,
        value: string | number,
        shouldValidate?: boolean | undefined
    ) => Promise<void> | Promise<FormikErrors<{ [k: string]: string }>>
    values: {
        [k: string]: string | undefined
    }
    name: string
    reference?: any
    options?: { value?: string; hubspotValue: string | number; label?: string }[]
    errors: FormikErrors<{
        [k: string]: string
    }>
    validateField: (name: string) => Promise<void> | Promise<string | undefined>
    openOptions: string[]
    setOpenOptions: Dispatch<SetStateAction<string[]>>
    placeholder?: string
}

function TextArea(props: React.RefAttributes<HTMLTextAreaElement> & IInputProps) {
    const { setFieldValue, values, reference, options, errors, validateField, openOptions, setOpenOptions, ...other } =
        props
    const error = errors[props.name]
    const [height, setHeight] = useState<string | number>('auto')
    return (
        <label style={{ height }} className={`${inputContainerClasses} ${error ? 'pb-8' : ''}`} htmlFor={other.name}>
            <TextareaAutosize
                onHeightChange={(height) => setHeight(height + 32)}
                onBlur={() => validateField(props.name)}
                className={`bg-transparent w-full outline-none absolute left-0 px-4 ${
                    error ? 'bottom-6 placeholder-shown:bottom-8' : 'bottom-2 placeholder-shown:bottom-4'
                } peer placeholder-shown:placeholder-transparent transition-all border-0 py-0 shadow-none ring-0 focus:ring-0 resize-none`}
                id={other.name}
                {...other}
            />
            <span className="relative -top-3 peer-placeholder-shown:top-0 text-xs peer-placeholder-shown:text-base peer-placeholder-shown:opacity-50 transition-all">
                {other.placeholder}
            </span>
            {error && <p className="text-red font-semibold m-0 text-sm absolute bottom-1">{error}</p>}
        </label>
    )
}

function Input(props: InputHTMLAttributes<HTMLInputElement> & IInputProps) {
    const { setFieldValue, values, reference, options, errors, validateField, openOptions, setOpenOptions, ...other } =
        props
    const error = errors[props.name]
    return (
        <label className={`${inputContainerClasses} ${error ? 'pb-8' : ''}`} htmlFor={other.name}>
            <input
                onBlur={() => validateField(props.name)}
                className={`bg-transparent w-full outline-none absolute left-0 px-4 ${
                    error ? 'bottom-6 placeholder-shown:bottom-8' : 'bottom-2 placeholder-shown:bottom-4'
                } peer placeholder-shown:placeholder-transparent transition-all border-0 py-0 shadow-none ring-0 focus:ring-0`}
                id={other.name}
                {...other}
            />
            <span className="relative -top-3 peer-placeholder-shown:top-0 text-xs peer-placeholder-shown:text-base peer-placeholder-shown:opacity-50 transition-all">
                {other.placeholder}
            </span>
            {error && <p className="text-red font-semibold m-0 text-sm absolute bottom-1">{error}</p>}
        </label>
    )
}

function Radio(props: InputHTMLAttributes<HTMLInputElement> & IInputProps & { label?: string }) {
    const {
        setFieldValue,
        values,
        reference,
        errors,
        validateField,
        options,
        label,
        openOptions,
        setOpenOptions,
        ...other
    } = props

    const handleChange = async (e: React.FormEvent<HTMLInputElement>) => {
        const { value } = e.currentTarget
        other.name && value && (await setFieldValue(other.name, value))
    }

    const handleClick = () => {
        const nextIndex = fields.findIndex((field) => field.name === other.name) + 1
        const nextField = fields[nextIndex]
        if (nextField && typeof window !== 'undefined') {
            const nextName = nextField?.name
            const nextValue =
                nextField?.options && (nextField?.options[0]?.value || nextField?.options[0]?.hubspotValue)
            const nextID = `${nextName}${nextValue ? '-' + nextValue : ''}`
            !openOptions.includes(nextName) && setOpenOptions([...openOptions, nextName])
            const nextEl = document.getElementById(nextID)
            if (!values[nextName]) {
                setTimeout(() => {
                    nextEl?.focus()
                    setFieldValue(nextName, nextValue || '')
                }, 0)
            }
        }
    }

    return (
        <label
            onMouseUp={handleClick}
            className="relative w-full text-center cursor-pointer"
            htmlFor={`${other.name}-${other.value}`}
        >
            <input
                checked={values[other.name] == other.value}
                className="absolute opacity-0 peer inset-0"
                {...other}
                type="radio"
                value={props.value}
                onChange={handleChange}
                id={`${other.name}-${other.value}`}
                {...(reference ? { ref: reference } : {})}
            />
            <span className="block py-2 w-full rounded-md border-[2px] border-black/10  peer-focus:border-black/40 peer-checked:!border-black/80 text-sm">
                {label || other.value}
            </span>
        </label>
    )
}

function RadioGroup(props: InputHTMLAttributes<HTMLInputElement> & IInputProps) {
    const { options, errors, validateField, openOptions, setOpenOptions, values, setFieldValue, ...other } = props
    const error = errors[props.name]
    const open = openOptions.includes(props.name)
    const ref = useRef()
    return (
        <div
            onFocus={() => {
                !openOptions.includes(other.name) && setOpenOptions([...openOptions, other.name])
            }}
            onClick={() => {
                if (options && !openOptions.includes(other.name)) {
                    setOpenOptions([...openOptions, other.name])
                    ref.current?.focus()
                    setFieldValue(other.name, options[0]?.value || options[0]?.hubspotValue)
                }
            }}
            className={`${inputContainerClasses} ${error ? 'pb-8' : ''} cursor-pointer`}
        >
            <p
                className={`m-0 ${open ? 'text-sm opacity-100' : 'opacity-50'} transition-all`}
                id={`group-${props.name}`}
            >
                {props.placeholder}
            </p>
            <motion.div className="overflow-hidden" animate={{ height: open ? 'auto' : 0 }} initial={{ height: 0 }}>
                <p className="m-0 mt-1 mb-4 text-xs">
                    <strong>Tip:</strong> Use{' '}
                    <kbd
                        className="text-xs border border-b-2 border-gray-accent-light/50 dark:border-gray-accent-dark/50 rounded-sm px-1.5 py-0.5 text-black/40 dark:text-white/40 font-sans mr-1"
                        style={{ fontSize: '10px' }}
                    >
                        ←
                    </kbd>
                    <kbd
                        className="text-xs border border-b-2 border-gray-accent-light/50 dark:border-gray-accent-dark/50 rounded-sm px-1.5 py-0.5 text-black/40 dark:text-white/40 font-sans"
                        style={{ fontSize: '10px' }}
                    >
                        →
                    </kbd>{' '}
                    to advance through options
                </p>
                <div
                    role="radiogroup"
                    aria-labelledby={`group-${props.name}`}
                    className={`mt-2 grid grid-cols-2 gap-x-2 gap-y-2 ${open ? 'opacity-100' : 'opacity-0 absolute'}`}
                >
                    {options?.map((option, index) => {
                        const { value, hubspotValue, label } = option
                        return (
                            <Radio
                                reference={index === 0 && ref}
                                key={value}
                                {...props}
                                value={value || hubspotValue}
                                label={label || value}
                            />
                        )
                    })}
                </div>
            </motion.div>
            {error && <p className="text-red font-semibold m-0 text-sm absolute bottom-1">{error}</p>}
        </div>
    )
}

const ValidationSchema = Yup.object().shape({
    firstName: Yup.string().required('Please enter your first name'),
    lastName: Yup.string(),
    workEmail: Yup.string().email('Please enter a valid email address').required('Please enter a valid email address'),
    companyName: Yup.string().required('Please enter your company name'),
    role: Yup.string().required('Please select your role'),
    monthlyActiveUsers: Yup.number().required('Please select a value'),
    monthlyEvents: Yup.number().required('Please select a value'),
    product: Yup.string().required("Please select the product you're interested in"),
    personalizedDemo: Yup.string().required('Please select an option'),
    details: Yup.string().nullable(),
})

export default function Contact() {
    const { href } = useLocation()
    const [submitted, setSubmitted] = useState(false)
    const [openOptions, setOpenOptions] = useState<string[]>([])
    const [confetti, setConfetti] = useState(true)
    const { handleSubmit, values, handleChange, setFieldValue, errors, validateField } = useFormik({
        initialValues: Object.fromEntries(fields.map((field) => [field.name, undefined])),
        onSubmit: async (values) => {
            const submission = {
                pageUri: href,
                pageName: 'Contact sales',
                fields: fields.map((field) => {
                    const value = values[field.name]
                    const option = field.options?.find((option) => value === option.value)?.hubspotValue
                    return {
                        objectTypeId: '0-1',
                        name: field.hubspotField,
                        value: option || value,
                    }
                }),
            }

            const res = await fetch(
                `https://api.hsforms.com/submissions/v3/integration/submit/6958578/21de475a-af2c-47c2-ae02-414aefdfdeb4`,
                {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json',
                    },
                    body: JSON.stringify(submission),
                }
            ).catch((err) => {
                console.log(err)
                return err
            })
            if (res.status === 200) {
                setSubmitted(true)
                scroll.scrollToTop()
            }
        },
        validationSchema: ValidationSchema,
        validateOnChange: false,
    })

    return submitted ? (
        <>
            {confetti && (
                <div className="fixed inset-0">
                    <Confetti onConfettiComplete={() => setConfetti(false)} recycle={false} numberOfPieces={1000} />
                </div>
            )}
            <div className="bg-gray-accent-light px-6 py-8 rounded-md mt-4">
                <h4>
                    ✅ <strong>Message received!</strong>
                </h4>
                <p>
                    A member of the PostHog team will get back to you as soon as we've had a chance to review your
                    information.&nbsp;
                </p>
                <p className="mb-0">
                    In the mean time, why not join <Link to="/slack">our Slack community</Link>?
                </p>
            </div>
        </>
    ) : (
        <form onSubmit={handleSubmit}>
            <p>
                <strong>Tip:</strong> Press{' '}
                <kbd
                    role="button"
                    className="text-xs border border-b-2 border-gray-accent-light/50 dark:border-gray-accent-dark/50 rounded-sm px-1.5 py-0.5 text-black/40 dark:text-white/40 font-sans"
                    style={{ fontSize: '10px' }}
                >
                    TAB
                </kbd>{' '}
                to advance through the form at a breakneck pace!
            </p>
            <div className="grid divide-y divide-dashed divide-gray-accent-light border border-gray-accent-light border-dashed">
                {fields.map(({ Component, name, placeHolder, type = 'text', options = [] }, index) => {
                    return (
                        <Component
                            autoFocus={index === 0}
                            key={name}
                            onChange={handleChange}
                            value={values[name]}
                            name={name}
                            placeholder={placeHolder}
                            setFieldValue={setFieldValue}
                            values={values}
                            type={type}
                            options={options}
                            errors={errors}
                            validateField={validateField}
                            openOptions={openOptions}
                            setOpenOptions={setOpenOptions}
                        />
                    )
                })}
            </div>
            <button className={button(undefined, 'full', 'mt-4', 'sm')} type="submit">
                Send message
            </button>
        </form>
    )
}
