import PropTypes from 'prop-types'
import Tippy from '@tippyjs/react/headless'

import { Wrapper as PopperWrapper } from '~/components/Popper'
import MenuItem from './MenuItem'
import Header from './Header'
import classNames from 'classnames/bind'
import styles from './Menu.module.scss'
import { useState } from 'react'

const cx = classNames.bind(styles)

const defaultFn = () => {}

const Menu = ({
    children,
    items = [],
    hideOnClick = false,
    onChange = defaultFn,
}) => {
    const [history, setHistory] = useState([{ data: items }])
    const current = history[history.length - 1]

    const renderItems = () => {
        return current.data.map((item, index) => {
            const isParent = !!item.children

            return (
                <MenuItem
                    key={index}
                    data={item}
                    onClick={() => {
                        if (isParent) {
                            setHistory((prev) => [...prev, item.children])
                        } else {
                            onChange(item)
                        }
                    }}
                />
            )
        })
    }

    const handleBack = () => {
        setHistory((prev) => prev.slice(0, prev.length - 1))
    }

    const renderResult = (attrs) => (
        <div className={cx('menu-lists')} tabIndex='-1' {...attrs}>
            <PopperWrapper className={cx('menu-popper')}>
                {history.length > 1 && (
                    <Header title={current.title} onBack={handleBack} />
                )}
                <div className={cx('menu-body')}>{renderItems()}</div>
            </PopperWrapper>
        </div>
    )

    // reset to first page
    const handleReset = () => {
        setHistory((prev) => prev.slice(0, 1))
    }

    return (
        // Fix warning Tippy by using <div>
        <div>
            <Tippy
                interactive
                delay={[0, 800]}
                offset={[10, 8]}
                hideOnClick={hideOnClick}
                placement='bottom-end'
                render={renderResult}
                onHide={handleReset}
            >
                {children}
            </Tippy>
        </div>
    )
}

Menu.propTypes = {
    children: PropTypes.node.isRequired,
    items: PropTypes.array,
    hideOnClick: PropTypes.bool,
    onChange: PropTypes.func,
}

export default Menu
