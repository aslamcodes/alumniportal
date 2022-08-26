import React from 'react'
import styles from './AddPhotos.module.css';
const AddPhotos = () => {
  return (
    <div className={styles.add_photos_container} onClick={(e) => e.stopPropagation()}>
      <div className={styles.image_input_container}>
        add photo
      </div>
      <button>
        Add Image
      </button>
    </div>
  )
}

export default AddPhotos