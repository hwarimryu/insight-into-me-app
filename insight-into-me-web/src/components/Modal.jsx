import './Modal.css'

const Modal = ({title, content, buttons}) => {
    return (
        <div className='overlay'>
        <div className='Modal'>
            <section className='title-section'> 
                {title}
            </section>
            <section className='content-section'>
                {content}
            </section>
            <section className='buttons-section'>
                {buttons}
            </section>
        </div>
        </div>
    )
}

export default Modal;