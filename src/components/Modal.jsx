import { motion } from "framer-motion";
import { AiOutlineClose } from "react-icons/ai"

function Modal({item, handleClose}) {
    console.log(item);
  return (
    <div className="modal-backdrop" onClick={(e) => {
      handleClose()
    }}>
        <motion.div
          initial={{
            scale: 0.3
          }}
          animate={{
            scale: 1
          }}
          exit={{
            scale: 0
          }}
          className="modal"
          onClick={(e) => e.stopPropagation()}
        >
            <button onClick={() => handleClose()}><AiOutlineClose/></button>
            <img src={item.images[0].filename} alt={item.images[0].title} />

            <h2>{item.title}</h2>
            <p><strong>hvem:</strong> {item.education}</p>
            <p><strong>Hvor:</strong> {item.city} ,{item.country}</p>
            <p><strong>periode:</strong> {item.start_date} - {item.stop_date} ({item.duration_in_weeks} uger)</p>
            <p>{item.description}</p>
            
        </motion.div>
    </div>
  )
}

export default Modal
