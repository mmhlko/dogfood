import s from './styles.module.css';
import classNames from 'classnames';
import { createPortal } from 'react-dom'
//onClick={() => e.stopPropagation()} запрещает обработку события при погружении(погружение, захват, всплытие)
//onMouseDown={onClose} для закрытия модального окна только когда нажимаешь во внешнюю область, а не кликаешь (нажал+отжал)


function Modal({children, isOpen, onClose}) {

    const renderContent = () => {
        return ( 
            <div className={classNames(s.modal, {[s.modal_active]: isOpen})} onMouseDown={onClose}>
                <div className={classNames(s.modal__content, {[s.modal__content_active]: isOpen})} onMouseDown={(e) => e.stopPropagation()}>
                    {children}
                </div>
            </div> 
        );

        
    }

    return createPortal(renderContent(), document.getElementById('modal-root'))
}

export default Modal;

