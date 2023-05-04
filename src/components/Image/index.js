import { forwardRef, useState } from 'react'
import images from '~/assets/images'
import styles from './Image.module.scss'
import classNames from 'classnames'

const Image = forwardRef(
    (
        {
            className,
            src,
            fallback: customFallback = images.noImage,
            alt,
            ...props
        },
        ref
    ) => {
        const [fallback, setFallback] = useState('')

        const handleError = () => {
            setFallback(customFallback)
        }

        return (
            <img
                className={classNames(className, styles.wrapper)}
                ref={ref}
                {...props}
                src={fallback || src}
                alt={alt}
                onError={handleError}
            />
        )
    }
)

export default Image
