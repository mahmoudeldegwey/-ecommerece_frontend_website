"use client"
import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { citiesListByDefaultCountry } from "@/utils/actions/cities/actions";
import { defaultCountry } from "@/utils/actions/countries/actions";
import Select from 'react-select';
import { FiUser, FiMapPin, FiCreditCard } from "react-icons/fi";

interface BillingAddress {
  username: string;
  phone: string;
  address: string;
  cityId: number;
  countryId: number;
}

type Props = {
  onShippingCostChange: (cost: number) => void;
  onErrorChange: (error: string | null) => void;
  onUsernameChange: (username: string) => void;
  onEmailChange: (email: string) => void;
  onPhoneChange: (phone: string) => void;
  onAddressChange: (address: string) => void;
  onCityIdChange: (cityId: number) => void;
  onCountryIdChange: (countryId: number) => void;
  onPaymentMethodChange: (paymentMethod: string) => void;
  onUseDifferentBillingAddressChange: (useDifferentBillingAddress: boolean) => void;
  onBillingAddressChange: (billingAddress: BillingAddress) => void;
};

export default function CheckoutUserInfo({
  onShippingCostChange,
  onErrorChange,
  onUsernameChange,
  onEmailChange,
  onPhoneChange,
  onAddressChange,
  onCityIdChange,
  onCountryIdChange,
  onPaymentMethodChange,
  onUseDifferentBillingAddressChange,
  onBillingAddressChange
}: Props) {

  const t = useTranslations('CheckoutUserInfo');
  const [useDifferentAddress, setUseDifferentAddress] = useState(false);
  const [cities, setCities] = useState([]);
  const [countries, setCountries] = useState([]);
  const [billingAddress, setBillingAddress] = useState<BillingAddress>({
    username: '',
    phone: '',
    address: '',
    cityId: 0,
    countryId: 0
  });

  const fetchCities = async () => {
    try {
      const data = await citiesListByDefaultCountry();
      setCities(data.data || []);
    } catch (error) {
      console.error('Error fetching cities:', error);
    }
  };

  const getDefaultCountry = async () => {
    try {
      const data = await defaultCountry();
      setCountries([data.data] || []);
    } catch (error) {
      console.error('Error fetching default country:', error);
    }
  };

  useEffect(() => {
    fetchCities();
    getDefaultCountry();
    onBillingAddressChange(billingAddress);
  }, [billingAddress, onBillingAddressChange]);

  const handleBillingAddressChange = (value: boolean) => {
    onUseDifferentBillingAddressChange(value);
    setUseDifferentAddress(value);
  };

  const inputClass = "w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent";
  const labelClass = "block text-sm font-semibold text-gray-900 mb-2";

  return (
    <div className="space-y-6">
      {/* Contact Information */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-purple-600 to-purple-700 px-6 py-4 flex items-center gap-3">
          <FiUser className="w-6 h-6 text-white" />
          <h2 className="text-2xl font-bold text-white">{t('contacts')}</h2>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className={labelClass}>{t('username')}</label>
            <input
              type="text"
              onChange={(e) => onUsernameChange(e.target.value)}
              className={inputClass}
              placeholder="Full Name"
              required
            />
          </div>
          <div>
            <label className={labelClass}>{t('email')}</label>
            <input
              type="email"
              onChange={(e) => onEmailChange(e.target.value)}
              className={inputClass}
              placeholder="your@email.com"
              required
            />
          </div>
          <div>
            <label className={labelClass}>{t('phone')}</label>
            <input
              type="tel"
              onChange={(e) => onPhoneChange(e.target.value)}
              className={inputClass}
              placeholder="+1 (555) 123-4567"
              required
            />
          </div>
        </div>
      </div>

      {/* Shipping Address */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-4 flex items-center gap-3">
          <FiMapPin className="w-6 h-6 text-white" />
          <h2 className="text-2xl font-bold text-white">{t('shippingAddress')}</h2>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className={labelClass}>{t('country')}</label>
            <Select
              onChange={(selectedOption) => {
                const selectedCountry = selectedOption as { value: number; label: string };
                onCountryIdChange(selectedCountry.value);
              }}
              options={countries.map(country => ({
                value: country.id,
                label: country.name,
              }))}
              classNamePrefix="react-select"
            />
          </div>
          <div>
            <label className={labelClass}>{t('city')}</label>
            <Select
              onChange={(selectedOption) => {
                const selectedCity = selectedOption as { value: number; label: string; price: number };
                onShippingCostChange(Number(selectedCity.price));
                onCityIdChange(selectedCity.value);
              }}
              options={cities.map(city => ({
                value: city.id,
                label: city.name,
                price: city.shipping_cost
              }))}
              classNamePrefix="react-select"
            />
          </div>
          <div>
            <label className={labelClass}>{t('address')}</label>
            <input
              type="text"
              onChange={(e) => onAddressChange(e.target.value)}
              className={inputClass}
              placeholder="123 Main Street"
              required
            />
          </div>
        </div>
      </div>

      {/* Payment Method */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-orange-600 to-orange-700 px-6 py-4 flex items-center gap-3">
          <FiCreditCard className="w-6 h-6 text-white" />
          <h2 className="text-2xl font-bold text-white">{t('paymentMethod')}</h2>
        </div>
        <div className="p-6">
          <label className={labelClass}>{t('selectPaymentMethod')}</label>
          <select
            onChange={(e) => onPaymentMethodChange(e.target.value)}
            className={inputClass}
            required
          >
            <option value="">{t('selectPaymentMethod')}</option>
            <option value="COD">{t('cashOnDelivery')}</option>
            <option value="instaPay">{t('instaPay')}</option>
            <option value="creditCard">{t('creditCard')}</option>
          </select>
        </div>
      </div>

      {/* Billing Address */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 px-6 py-4">
          <h2 className="text-2xl font-bold text-white">{t('billing_address')}</h2>
        </div>
        <div className="p-6 space-y-4">
          <div className="space-y-3">
            <label className="flex items-center p-3 border-2 border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors" >
              <input
                type="radio"
                name="billing"
                checked={!useDifferentAddress}
                onChange={() => handleBillingAddressChange(false)}
                className="w-4 h-4 text-blue-600"
              />
              <span className="ml-3 font-medium text-gray-900">Same as shipping address</span>
            </label>

            <label className="flex items-center p-3 border-2 border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
              <input
                type="radio"
                name="billing"
                checked={useDifferentAddress}
                onChange={() => handleBillingAddressChange(true)}
                className="w-4 h-4 text-blue-600"
              />
              <span className="ml-3 font-medium text-gray-900">Use a different billing address</span>
            </label>
          </div>

          {useDifferentAddress && (
            <div className="mt-6 pt-6 border-t space-y-4 bg-gray-50 p-4 rounded-lg">
              <div>
                <label className={labelClass}>{t('username')}</label>
                <input
                  type="text"
                  onChange={(e) => setBillingAddress({ ...billingAddress, username: e.target.value })}
                  className={inputClass}
                  placeholder="Full Name"
                  required
                />
              </div>
              <div>
                <label className={labelClass}>{t('country')}</label>
                <Select
                  onChange={(selectedOption) => {
                    const selectedCountry = selectedOption as { value: number; label: string };
                    setBillingAddress({ ...billingAddress, countryId: selectedCountry.value });
                  }}
                  options={countries.map(country => ({
                    value: country.id,
                    label: country.name,
                  }))}
                />
              </div>
              <div>
                <label className={labelClass}>{t('city')}</label>
                <Select
                  onChange={(selectedOption) => {
                    const selectedCity = selectedOption as { value: number; label: string };
                    setBillingAddress({ ...billingAddress, cityId: selectedCity.value });
                  }}
                  options={cities.map(city => ({
                    value: city.id,
                    label: city.name,
                  }))}
                />
              </div>
              <div>
                <label className={labelClass}>{t('address')}</label>
                <input
                  className={inputClass}
                  onChange={(e) => setBillingAddress({ ...billingAddress, address: e.target.value })}
                  placeholder="123 Main Street"
                />
              </div>
              <div>
                <label className={labelClass}>{t('phone')}</label>
                <input
                  className={inputClass}
                  onChange={(e) => setBillingAddress({ ...billingAddress, phone: e.target.value })}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}