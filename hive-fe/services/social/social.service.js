import axios from 'axios';
import base from '../config';

export default class Socials {
  static headers (merchantId) {
    return {
      headers: base.authH ({
        entity: 'Merchant',
        id: merchantId,
      }),
    };
  }
  static async updateWhatsappNumber({merchantId, phone}) {
    return base.makeReq (async () =>
      axios.get (
        `${base.url}UpdateWhatsApp/?merchantId=${merchantId}&whatsApp=${phone}`,
        this.headers (merchantId)
      )
    );
  }

  static async toggleWhatsappSupport({state, merchantId}) {
    return base.makeReq (async () =>
      axios.get (
        `${base.url}WhatsAppSupport/?merchantId=${merchantId}&isEnabled=${state}`,
        this.headers (merchantId)
      )
    );
  }
}
