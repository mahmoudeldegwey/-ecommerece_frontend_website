/**
 * Social Share Utility Class
 * Generates shareable URLs for different social media platforms
 */
class SocialShare {
  url: string;
  title: string;
  image: string;
  description: string;
  /**
   * Constructor
   * @param {string} url - The URL to share
   * @param {string} title - The title/name to share
   * @param {string} image - Optional image URL (for Pinterest)
   * @param {string} description - Optional description
   */
  constructor(url : string, title :string, image: string, description: string) {
    this.url = url;
    this.title = this.truncateText(title, 120);
    this.image = image;
    this.description = description || this.title;
  }

  /**
   * Truncate text to specified length
   * @param {string} text 
   * @param {number} maxLength 
   * @returns {string}
   */
  truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength - 3) + '...';
  }

  /**
   * Get share URL for specified platform
   * @param {string} type - Platform type (facebook, twitter, whatsapp, etc.)
   * @returns {string}
   */
  getShareUrl(type = 'facebook') {
    const params = new URLSearchParams();

    switch (type) {
      case 'facebook':
        params.append('app_id', process.env.NEXT_PUBLIC_FACEBOOK_APP_ID || '3007092402689514');
        params.append('href', this.url);
        params.append('display', 'page');
        params.append('quote', this.title);
        return `https://www.facebook.com/dialog/share?${params.toString()}`;

      case 'x':
        params.append('url', this.url);
        params.append('text', this.title);
        return `https://x.com/intent/tweet?${params.toString()}`;

      case 'whatsapp':
        params.append('text', `${this.title} ${this.url}`);
        return `https://wa.me/?${params.toString()}`;

      case 'linkedin':
        params.append('url', this.url);
        params.append('mini', 'true');
        params.append('title', this.title);
        params.append('summary', this.description);
        return `https://www.linkedin.com/shareArticle?${params.toString()}`;

      case 'pinterest':
        params.append('url', this.url);
        params.append('description', this.title);
        if (this.image) {
          params.append('media', this.image);
        }
        return `https://pinterest.com/pin/create/button/?${params.toString()}`;

      case 'telegram':
        params.append('url', this.url);
        params.append('text', this.title);
        return `https://telegram.me/share/url?${params.toString()}`;

      case 'email':
        params.append('subject', `Check out: ${this.title}`);
        params.append('body', `${this.title}\n\n${this.url}`);
        return `mailto:?${params.toString()}`;

      case 'google':
        params.append('url', this.url);
        return `https://plus.google.com/share?${params.toString()}`;

      default:
        return this.url;
    }
  }

  /**
   * Get all share URLs at once
   * @returns {Object}
   */
  getAllShareUrls() {
    return {
      facebook: this.getShareUrl('facebook'),
      twitter: this.getShareUrl('twitter'),
      whatsapp: this.getShareUrl('whatsapp'),
      linkedin: this.getShareUrl('linkedin'),
      pinterest: this.getShareUrl('pinterest'),
      telegram: this.getShareUrl('telegram'),
      email: this.getShareUrl('email'),
      google: this.getShareUrl('google'),
    };
  }
}

export default SocialShare;

// Example Usage:
// 
// import SocialShare from '@/utils/SocialShare';
// 
// const shareUrl = 'https://example.com/product/123';
// const productName = 'Premium Wireless Headphones';
// const productImage = 'https://example.com/images/product.jpg';
// 
// const socialShare = new SocialShare(shareUrl, productName, productImage);
// 
// // Get specific platform URL
// const facebookUrl = socialShare.getShareUrl('facebook');
// const twitterUrl = socialShare.getShareUrl('twitter');
// 
// // Or get all URLs at once
// const allUrls = socialShare.getAllShareUrls();