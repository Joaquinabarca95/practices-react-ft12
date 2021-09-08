import React from 'react';
import PropTypes from 'prop-types';
import AccordionItem from './AccordionItem';

const Accordion = ({ faq, search, setFAQ, deleteFAQ }) => {
    return (
        <div className="accordion" id="accordionExample">
            {
                faq.length > 0 &&
                faq.filter((item) => {
                    return item.question.includes(search) || item.answer.includes(search)
                }).map((fq, index) => {
                    return (
                        <AccordionItem fq={fq} key={index} index={index} setFAQ={setFAQ} deleteFAQ={deleteFAQ}/>
                    )
                })
            }
        </div>
    )
}

Accordion.defaultProps = {
    faq: [
        { id: 1, question: 'Pregunta 1', answer: 'Respuesta a Pregunta 1' },
    ]
}

Accordion.propTypes = {
    faq: PropTypes.array.isRequired,
    search: PropTypes.string
}

export default Accordion;