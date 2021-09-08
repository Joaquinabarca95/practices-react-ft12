import React from 'react';
import { FaPen, FaTrash } from 'react-icons/fa';

const AccordionItem = ({ fq, index, setFAQ, deleteFAQ }) => {
    return (
        <div className="accordion-item">
            <h2 className="accordion-header" id={"heading" + index}>
                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={"#collapse" + index} aria-expanded="true" aria-controls={"collapse" + index}>
                    {fq.question}
                </button>
            </h2>
            <div id={"collapse" + index} className={"accordion-collapse collapse " + (index === 0 ? "show" : "")} aria-labelledby={"heading" + index} data-bs-parent="#accordionExample">
                <div className="accordion-body">
                    {fq.answer} 
                    <button className="btn btn-info btn-sm float-end" data-bs-toggle="modal" data-bs-target="#modalForm" onClick={() => setFAQ(fq)}><FaPen /></button>
                    <button className="btn btn-danger btn-sm float-end"  onClick={() => deleteFAQ(fq)}><FaTrash /></button>
                </div>
            </div>
        </div>
    )
}

export default AccordionItem;