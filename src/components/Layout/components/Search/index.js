import { useEffect, useState, useRef } from 'react'
import classNames from 'classnames/bind'
import styles from './Search.module.scss'
import HeadlessTippy from '@tippyjs/react/headless'
import 'tippy.js/dist/tippy.css'
import { Wrapper as PopperWrapper } from '~/components/Popper'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faCircleXmark,
    faMagnifyingGlass,
    faSpinner,
} from '@fortawesome/free-solid-svg-icons'

import * as searchService from '~/apiServices/searchServices'
import AccountItem from '~/components/AccountItem'
import { useDebounce } from '~/hooks'

const cx = classNames.bind(styles)

const Search = () => {
    const [searchValue, setSearchValue] = useState('')
    const [searchResult, setSearchResult] = useState([])
    const [showResult, setShowResult] = useState(true)
    const [loading, setLoading] = useState(false)

    const debounced = useDebounce(searchValue, 700)

    const inputRef = useRef()

    useEffect(() => {
        if (!debounced.trim()) {
            setSearchResult([])
            return
        }

        const fetchApi = async () => {
            setLoading(true)

            const result = await searchService.search(debounced)
            setSearchResult(result)
            setLoading(false)
        }

        fetchApi()

        // fetch(
        //     `https://tiktok.fullstack.edu.vn/api/users/search?q=${encodeURIComponent(
        //         debounced
        //     )}&type=less`
        // )
        //     .then((res) => res.json())
        //     .then((res) => {
        //         setSearchResult(res.data)
        //         setLoading(false)
        //     })
        //     .catch(() => {
        //         setLoading(false)
        //     })
    }, [debounced])

    const handleClear = () => {
        setSearchValue('')
        setSearchResult([])
        inputRef.current.focus()
    }

    const handleHideResult = () => {
        setShowResult(false)
    }

    const handleChange = (e) => {
        const searchValue = e.target.value
        if (!searchValue.startsWith(' ')) {
            setSearchValue(searchValue)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    return (
        // Fix Tippy Warning by using a wrapper <div>
        <div>
            <HeadlessTippy
                interactive
                visible={showResult && searchResult.length > 0}
                render={(attrs) => (
                    <div
                        className={cx('search-result')}
                        tabIndex='-1'
                        {...attrs}
                    >
                        <PopperWrapper>
                            <h4 className={cx('search-title')}>Accounts</h4>
                            {searchResult.map((result) => (
                                <AccountItem key={result.id} data={result} />
                            ))}
                        </PopperWrapper>
                    </div>
                )}
                onClickOutside={handleHideResult}
            >
                <div className={cx('search')}>
                    <input
                        ref={inputRef}
                        value={searchValue}
                        placeholder='Search'
                        spellCheck={false}
                        onChange={handleChange}
                        onFocus={() => setShowResult(true)}
                    />
                    {!!searchValue && !loading && (
                        <button className={cx('clear')} onClick={handleClear}>
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                    )}

                    {loading && (
                        <FontAwesomeIcon
                            className={cx('loading')}
                            icon={faSpinner}
                        />
                    )}
                    {/* Loading */}

                    <button
                        className={cx('search-btn')}
                        onMouseDown={handleSubmit}
                    >
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </button>
                </div>
            </HeadlessTippy>
        </div>
    )
}

export default Search
