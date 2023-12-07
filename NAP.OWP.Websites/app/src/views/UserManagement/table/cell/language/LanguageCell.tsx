import React, { useEffect, useRef, useState } from 'react';
import { TUserInfo } from '../../../type';
import store from '../../../app/useStoreNative';
import DropdownIcon from '../../../../../assets/svg-element/DropdownIcon';
import { updateUserInfo } from '../../../utils';

const LanguageCell = (props: {
  handleShowDropdown: (isOpen: boolean) => void;
  dataSource: Array<TUserInfo>;
  rowIndex: number;
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const { options, updateValue } = store.getState();
  const { languages } = options;
  const { rowIndex, dataSource, handleShowDropdown } = props;
  const languageValue =
    dataSource[rowIndex].languageId?.split(',').map(item => item.trim()) ?? [];
  const [selectedLanguages, setSelectedLanguages] =
    useState<string[]>(languageValue);
  const languageLabel = languages
    .filter(o => selectedLanguages?.some(id => parseInt(id) === o.value))
    .map(x => x.label)
    .join(',');

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpenDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dropdownRef]);

  useEffect(() => {
    isOpenDropdown && handleShowDropdown && handleShowDropdown(isOpenDropdown);
    // eslint-disable-next-line no-warning-comments
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpenDropdown]);

  const toggleLanguage = (language: string) => {
    setSelectedLanguages(prevSelected =>
      prevSelected?.includes(language)
        ? prevSelected.filter(l => l !== language)
        : [...prevSelected, language]
    );
  };

  return (
    <>
      <div className='language-cell'>
        <span className='language-label'>{languageLabel}</span>
        <span
          className='language-dropdown-icon'
          onClick={() => setIsOpenDropdown(true)}>
          <DropdownIcon colorDropdown='#282d38' />
        </span>
      </div>
      {isOpenDropdown && (
        <div ref={dropdownRef} className='dropdown-multi-language is-show'>
          <ul>
            {languages.map(language => {
              const languageValue = String(language.value);
              return (
                <li key={language.label}>
                  <label>
                    <input
                      type='checkbox'
                      value={language.value ?? 0}
                      checked={selectedLanguages?.some(
                        x => x.trim() === languageValue
                      )}
                      onChange={() => toggleLanguage(languageValue)}
                    />
                    {language.label}
                  </label>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
};

export default LanguageCell;
