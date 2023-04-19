import { useState } from 'react';
import s from './styles.module.css'

function Form({handleForm, children, title}) {

    /*
    const deafaultFrom = {
        name: '', 
        lastname: '', 
        phoneNumber: ''
    }

    const [contactInfo, setContactInfo] = useState(deafaultFrom)

    const handleChange = (e) => {
        setContactInfo({...contactInfo, [e.target.name]: e.target.value}) 
    }

     const handleSubmit = (e) => {
        e.preventDefault();
        handleForm(contactInfo)
        setContactInfo(deafaultFrom)
    } */

    

    return ( 
        <form onSubmit={handleForm} className={s.form}>
            {title && <h3 className={s.title}>{title}</h3>}
            {children}
        </form>
     );
}

export default Form;