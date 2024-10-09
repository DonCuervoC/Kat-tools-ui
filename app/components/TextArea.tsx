import React from 'react'
import { Form } from 'react-bootstrap'
import { SectionType } from '../@types/types.d'
// import { SectionType } from '../@types/types.d'

// interface CommonProps {
//     onChange: (value: string) => void
//     value: string
// }

// type Props =
// |{type: SectionType.From, loading?: undefined, onChange:(value: string) => void, value: string}
// |{type: SectionType.To, loading?: boolean, onChange:(value: string) => void, value: string}

interface Props {
    type: SectionType
    loading?: boolean
    onChange: (value: string) => void
    value: string
}

//   const commonStyles = { border: 0, height: '200px', resize: 'none' }
const commonStyles = { border: 0, height: '200px' }

const getPlaceholder = ({ type, loading }: { type: SectionType, loading?: boolean }) => {
    if (type === SectionType.From) return 'Enter text'
    if (loading === true) return 'Loading...'
    return 'Translation'
}


export const TextArea = ({ type, loading, value, onChange }: Props) => {
    const styles = type === SectionType.From
        ? commonStyles
        : { ...commonStyles, backgroundColor: '#f5f5f5' }

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        onChange(event.target.value)
    }

    return (
        <Form.Control
            autoFocus={type === SectionType.From}
            as='textarea' // react boostrap, que elemento quiero renderizar
            disabled={type === SectionType.To}
            placeholder={getPlaceholder({ type, loading })}
            style={styles}
            value={value}
            onChange={handleChange}
        />
    )
}