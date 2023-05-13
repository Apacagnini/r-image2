import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { ReactComponent as Check } from '../../assets/check.svg'
import { ReactComponent as Spin } from '../../assets/spin.svg'

export default function ContactForm() {
    const [sended, setSended] = useState(3);
    const { register, formState: { errors }, handleSubmit, reset } = useForm("");
    const maxLength = 80;
    const messageMinLength = 10;
    const messageMaxLength = 300;
    let showStatus = false;

    const onSubmit = async (data) => {
        try {
            setSended(2);
            const response = await fetch(process.env.REACT_APP_API_URL+'/send', {
                method: 'post',
                body: JSON.stringify(data),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            });
            const jsonData = await response.json();
            setSended(jsonData.ok == true ? true : false);
            setTimeout(() => setSended(3), 6000); //wait 6 seg
            reset();
        } catch {
            setSended(false);
            reset();
        }
    }

    const showError = () => {
        if (showStatus) {
            return false;
        } else {
            showStatus = true;
            return true;
        }
    }

    useEffect(() => {
        showStatus = false;
    });

    const errorMessage = (error, type, message) => error?.type === type && showError() && <p className="errorText">{message}</p>;

    return (
        <div className='formContainer'>
            <h3 className='text-secondary formTitle'>Contact Us</h3>
            <form onSubmit={handleSubmit(onSubmit)} method="post" className='formRegister'>
                {errorMessage(errors.fullName, 'required', 'Full Name field is required')}
                <input
                    type="text"
                    placeholder=" Full Name *"
                    maxLength={maxLength}
                    autoComplete="off"
                    id="fullName"
                    {...register('fullName', { required: true, maxLength: maxLength })}
                    className="input"
                />
                {errorMessage(errors.email, 'required', 'Email field is required')}
                {errorMessage(errors.email, 'pattern', 'Format is wrong')}
                <input
                    type="text"
                    placeholder=" Email *"
                    maxLength={maxLength}
                    autoComplete="off"
                    id="email"
                    {...register('email', { required: true, pattern: /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/, maxLength: maxLength })}
                    className="input"
                />
                {errorMessage(errors.message, 'required', 'Message field is required')}
                {errorMessage(errors.message, 'minLength', `Please use at last ${messageMinLength} characters`)}
                <textarea
                    placeholder=" Message *"
                    maxLength={messageMaxLength}
                    cols="20"
                    rows="5"
                    autoComplete="off"
                    id="message"
                    {...register('message', { required: true, minLength: messageMinLength, maxLength: messageMaxLength })}
                    className="input textarea"
                ></textarea>
                <label className={`submit ${(sended == true) ? 'submitOk' : (sended == false) ? 'submitFail' : ''}`}>
                    <input type="submit" className='d-none' />
                    {
                        (sended == 3) ? <p>Submit</p> :
                            (sended == 2) ? <Spin className='spin' /> :
                                (sended == true) ? <Check className='check' /> :
                                    <p className='sendedFail'>Something went wrong</p>
                    }
                </label>
            </form>
        </div>
    );
}