"use client";

import React, { useState, useEffect } from 'react';
import { FiStar, FiThumbsUp, FiThumbsDown, FiUser, FiCalendar, FiCheck, FiX, FiUpload, FiMail, FiPhone } from 'react-icons/fi';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import {saveProductReview,productReviews} from '@/utils/actions/products/actions';
import { useTranslations } from 'next-intl';
import { toast } from 'react-toastify';

// Mock reviews data - replace with your actual API call

const ratingDistribution = [
  { stars: 5, count: 156, percentage: 63 },
  { stars: 4, count: 62, percentage: 25 },
  { stars: 3, count: 20, percentage: 8 },
  { stars: 2, count: 7, percentage: 3 },
  { stars: 1, count: 3, percentage: 1 }
];

export default function ProductReviews({ productId }: { productId: number }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState('newest');
  const [filterBy, setFilterBy] = useState('all');
  const [showWriteReview, setShowWriteReview] = useState(false);
  
  const t = useTranslations('ProductReviews');
  // Form states
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone_number: '',
    rate: '5',
    message: '',
    image: ''
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const renderStars = (rating: number, size = 'w-4 h-4') => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} className={`${size} text-yellow-400`} />);
    }
    
    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" className={`${size} text-yellow-400`} />);
    }
    
    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} className={`${size} text-gray-300`} />);
    }
    
    return stars;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.username.trim()) {
      errors.username = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    
    if (!formData.phone_number.trim()) {
      errors.phone_number = 'Phone number is required';
    }
    
    if (!formData.message.trim()) {
      errors.message = 'Review message is required';
    } else if (formData.message.trim().length < 10) {
      errors.message = 'Review must be at least 10 characters';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error(`Please fix the errors in the form. ${Object.keys(formErrors).length} error(s) found.`);
      return;
    }
    
    setIsSubmitting(true);

    try {      
      saveProductReview(productId,formData).then((result: { message: string }) => {
        if(result.message) {
          
          toast.success(result.message);

          setTimeout(() => {
            setShowWriteReview(false);            
          }, 5000);

          setFormData({
          rate: '5',message: '',phone_number: '',email: '',username: '',image: ''
          });
        }

      }).catch((error: Error) => {
        toast.error(error.message);
      });

    } catch (error) {
      // console.error('Error submitting review:', error);
      toast.error('Failed to submit review. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

    const fetchReviews = async () => {
      setLoading(true);
      try {
        const data = await productReviews(productId, 1);
        console.log('Fetched reviews:', data.data);
        setReviews(data.data || []);
      } catch (error) { 
        console.error('Error fetching reviews:', error);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    if (!productId) {
      return;
    } 

    fetchReviews();
  }, [productId]);

  if (loading) {
    return <p>${t('loading_reviews')}</p>;
  }

  return (
    <div className="space-y-8">

      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-gray-900">{t('customer_reviews')}</h2>
        <div className="flex items-center space-x-2">
          {/* <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <FiStar key={i} className="w-5 h-5 text-yellow-400 fill-current" />
            ))}
          </div>
          <span className="text-lg font-semibold text-gray-900">4.8</span> */}
          <span className="text-gray-500">({reviews.length} {t('reviews')})</span>
        </div>
      </div>

      {/* Reviews Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Rating Summary */}
        {/* <div className="bg-gray-50 rounded-xl p-6">
          <div className="text-center mb-6">
            <div className="text-5xl font-bold text-gray-900 mb-2">4.8</div>
            <div className="flex justify-center items-center space-x-1 mb-2">
              {renderStars(4.8, 'w-6 h-6')}
            <p className="text-gray-600">({t('based_on')} {reviews.length} {t('reviews')})</p>
          </div>
          </div>
          
          <div className="space-y-2">
            {ratingDistribution.map((item) => (
              <div key={item.stars} className="flex items-center space-x-3">
                <span className="text-sm font-medium text-gray-700 w-6">
                  {item.stars}★
                </span>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-yellow-400 h-2 rounded-full" 
                    style={{ width: `${item.percentage}%` }}></div>
                </div>
                <span className="text-sm text-gray-600 w-12">{item.count}</span>
              </div>
            ))}
          </div>
        </div> */}

        {/* Write Review */}
        <div className="lg:col-span-2">
          <div className="bg-blue-50 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">{t('share_experience')}</h3>
            <p className="text-gray-600 mb-4">
              {t('share_experience2')}
            </p>
            <button 
              onClick={() => setShowWriteReview(true)}
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              {t('add_review')}
            </button>
          </div>
        </div>
      </div>

      {/* Write Review Modal */}
      {showWriteReview && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">{t('add_review')}</h2>
              <button
                onClick={() => setShowWriteReview(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <FiX className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <div className="space-y-6">
                {/* Rating Selection */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-3">
                    Your Rating *
                  </label>
                  <div className="flex items-center space-x-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
                        className="transition-transform hover:scale-110"
                      >
                        <FaStar
                          className={`w-8 h-8 ${
                            star <= formData.rating ? 'text-yellow-400' : 'text-gray-300'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="ml-2 text-gray-600 font-medium">
                      ({formData.rating} {formData.rating === 1 ? 'star' : 'stars'})
                    </span>
                  </div>
                </div>

                {/* username Field */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    {t('username')} *
                  </label>
                  <div className="relative">
                    <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        formErrors.username ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter your full name"
                    />
                  </div>
                  {formErrors.username && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.username}</p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    {t('email')} *
                  </label>
                  <div className="relative">
                    <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        formErrors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="your.email@example.com"
                    />
                  </div>
                  {formErrors.email && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>
                  )}
                </div>

                {/* Phone Field */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    {t('phone_number')} *
                  </label>
                  <div className="relative">
                    <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="tel"
                      name="phone_number"
                      value={formData.phone_number}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        formErrors.phone_number ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  {formErrors.phone_number && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.phone_number}</p>
                  )}
                </div>

                {/* Review Message */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    {t('your_review')} *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={5}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${
                      formErrors.message ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Share your experience with this product... (minimum 10 characters)"
                  />
                  <div className="flex justify-between items-center mt-2">
                    {formErrors.message && (
                      <p className="text-sm text-red-600">{formErrors.message}</p>
                    )}
                    <p className="text-sm text-gray-500 ml-auto">
                      {formData.message.length} characters
                    </p>
                  </div>
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    {t('upload_image')}
                  </label>
                  <div className="space-y-4">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setFormData({ ...formData, image: e.target.files?.[0] || null })}
                        className="hidden"
                        id="image-upload"
                      />
                      <label
                        htmlFor="image-upload"
                        className="cursor-pointer flex flex-col items-center"
                      >
                        <FiUpload className="w-10 h-10 text-gray-400 mb-2" />
                        <span className="text-sm font-medium text-gray-700">
                          {t('click_upload_images')}
                        </span>
                        <span className="text-xs text-gray-500 mt-1">
                          PNG, JPG up to 5MB (Max 1 images)
                        </span>
                      </label>
                    </div>

                    {/* Image Previews */}

                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-gray-50 px-6 py-4 flex items-center justify-between border-t">
              <p className="text-sm text-gray-600">{t('required_fields')}</p>
              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => setShowWriteReview(false)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmitReview}
                  disabled={isSubmitting}
                  className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>{t('submitting_review')}...</span>
                    </>
                  ) : (
                    <span>{t('add_review')}</span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filters and Sort */}
      {/* <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 border-t pt-8">
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium text-gray-700">Filter by:</span>
          <select 
            value={filterBy} 
            onChange={(e) => setFilterBy(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
          >
            <option value="all">All Reviews</option>
            <option value="5">5 Stars</option>
            <option value="4">4 Stars</option>
            <option value="3">3 Stars</option>
            <option value="2">2 Stars</option>
            <option value="1">1 Star</option>
            <option value="verified">Verified Purchase</option>
            <option value="photos">With Photos</option>
          </select>
        </div>

        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium text-gray-700">Sort by:</span>
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="highest">Highest Rating</option>
            <option value="lowest">Lowest Rating</option>
            <option value="helpful">Most Helpful</option>
          </select>
        </div>
      </div> */}

      {/* Reviews List */}
      <div className="space-y-6">
        {reviews.map((review) => (
            <div key={review.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-semibold text-gray-900">{review.username}</h4>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <FiCalendar className="w-4 h-4" />
                    <span>{formatDate(review.created_at)}</span>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center space-x-2 mb-3">
                  <div className="flex items-center space-x-1">
                    {renderStars(review.rate)}
                  </div>
                  <span className="text-sm font-medium text-gray-700">({review.rate}.0)</span>
                </div>

                {/* Review Text */}
                <p className="text-gray-700 leading-relaxed mb-4">{review.message}</p>

                {/* Review Images */}
                <div className="flex space-x-2 mb-4">
                    <img
                      src={review.image}
                      className="w-16 h-16 object-cover rounded-lg cursor-pointer hover:opacity-75 transition-opacity"
                    />
                </div>
              </div>
            </div>
        ))}
      </div>
      
      {reviews.length === 0 && (
        <p className="text-center text-gray-600">No reviews yet. Be the first to review this product!</p>
      )}

      {reviews.length > 0 && (
        <div className="text-center pt-8">
          <button className="px-8 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors">
            {t('load_more')}
          </button>
        </div>
      )}

    </div>
  );
}