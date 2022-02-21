const axios = require("axios").default;

class FreshWorksCrm {
  constructor({ authToken = "", freshworksSubdomain = "" } = {}) {
    this.authToken = authToken;
    this.freshworksSubdomain = freshworksSubdomain;
  }

  get apiBaseUrl() {
    return `https://${this.freshworksSubdomain}.myfreshworks.com/crm/sales/api/`;
  }

  get headersObject() {
    return { Authorization: `Token ${this.authToken}` };
  }

  /**
   * @description - Takes a search query and returns an array of contact objects
   * @param {string} searchParam - The search query you want to use to retrieve contacts
   * @returns {Promise<{}[]>}
   */
  async searchForContacts(searchParam) {
    const requestUrl = `${this.apiBaseUrl}search?q=${searchParam}&include=contact`;

    const axiosConfig = {
      method: "get",
      url: requestUrl,
      headers: this.headersObject,
    };

    const axiosResponse = await axios(axiosConfig);

    return axiosResponse.data;
  }

  /**
   * @description - Fetches a single contact from Freshworks CRM based on a contact id.
   * @param {string} id
   * @returns {Promise<{any}>}
   */
  async getContact(id) {
    const requestUrl = `${this.apiBaseUrl}contacts/${id}?include=sales_accounts&include=deals&include=notes`;

    const axiosConfig = {
      method: "get",
      url: requestUrl,
      headers: this.headersObject,
    };

    const axiosResponse = await axios(axiosConfig);

    return axiosResponse.data;
  }

  /**
   * @description - Creates a new contact in Freshworks.
   * @description - Returns the contents of the contact
   * @param {string} firstName
   * @param {string} lastName
   * @param {string} mobileNumber
   * @param {string} jobTitle
   * @param {string} email
   * @param {number} salesAccountId
   * @param {{}} customFields
   * @returns {Promise<{}>}
   */
  async createContact({
    firstName = "",
    lastName = "",
    mobileNumber = "",
    jobTitle = "",
    email = "",
    salesAccountId = 0,
    customFields = {},
  } = {}) {
    let contactData = {
      first_name: firstName,
      last_name: lastName,
      mobile_number: mobileNumber,
      job_title: jobTitle,
      email: email,
      sales_accounts: [{ id: parseInt(salesAccountId), is_primary: true }],
      custom_field: customFields,
    };

    const requestUrl = `${this.apiBaseUrl}contacts`;

    const axiosConfig = {
      method: "post",
      url: requestUrl,
      headers: this.headersObject,
      data: contactData,
    };

    let response = {};

    try {
      response = await axios(axiosConfig);
      return response.data;
    } catch (error) {
      console.error(error.response.data.errors.message);
    }
  }

  /**
   * @description - Updates a contact in Freshworks.
   * @description - Returns the contents of the contact
   * @param {string} id
   * @param {string} [firstName]
   * @param {string} [lastName]
   * @param {string} [mobileNumber]
   * @param {string} [jobTitle]
   * @param {string} [email]
   * @param {number} [salesAccountId]
   * @param {{}} [customFields]
   * @returns {Promise<{}>}
   */
  async updateContact({
    id = "",
    firstName,
    lastName,
    mobileNumber,
    jobTitle,
    email,
    salesAccountId,
    customFields,
  }) {
    let contactData = {};

    if (firstName) contactData.first_name = firstName;
    if (lastName) contactData.last_name = lastName;
    if (mobileNumber) contactData.mobile_number = mobileNumber;
    if (jobTitle) contactData.job_title = jobTitle;
    if (email) contactData.email = email;
    if (salesAccountId)
      contactData.sales_accounts = [
        { id: parseInt(salesAccountId), is_primary: true },
      ];
    if (customFields) contactData.custom_field = customFields;

    const requestUrl = `${this.apiBaseUrl}contacts/${id}`;

    const axiosConfig = {
      method: "put",
      url: requestUrl,
      headers: this.headersObject,
      data: contactData,
    };

    let response = {};

    try {
      response = await axios(axiosConfig);
      return response.data;
    } catch (error) {
      console.error(error.response.data);
    }
  }

  /**
   * @description - Takes a search query and returns an array of account objects
   * @param {string} searchParam - The search query you want to use to retrieve accounts
   * @returns {Promise<{}[]>}
   */
  async searchForAccounts(searchParam) {
    const requestUrl = `${this.apiBaseUrl}search?q=${searchParam}&include=sales_account`;

    const axiosConfig = {
      method: "get",
      url: requestUrl,
      headers: this.headersObject,
    };

    const axiosResponse = await axios(axiosConfig);

    return axiosResponse.data;
  }

  /**
   * @description - Creates a new account in Freshworks.
   * @description - Returns the contents of the account
   * @param {string} name
   * @param {{}} customFields
   * @returns {Promise<{}>}
   */
  async createAccount({ name = "", customFields = {} } = {}) {
    let accountData = {
      name: name,
      custom_field: customFields,
    };

    const requestUrl = `${this.apiBaseUrl}sales_accounts`;

    const axiosConfig = {
      method: "post",
      url: requestUrl,
      headers: this.headersObject,
      data: accountData,
    };

    let response = {};

    try {
      response = await axios(axiosConfig);
      return response.data;
    } catch (error) {
      console.error(error.response.data.errors.message);
    }
  }

  /**
   * @description - Updates an account in Freshworks.
   * @description - Returns the contents of the account
   * @param {string} id
   * @param {string} [name]
   * @param {{}} [customFields]
   * @returns {Promise<{}>}
   */
  async updateAccount({ id = "", name, customFields }) {
    let accountData = {};

    if (name) accountData.name = name;
    if (customFields) accountData.custom_field = customFields;

    const requestUrl = `${this.apiBaseUrl}sales_accounts/${id}`;

    const axiosConfig = {
      method: "put",
      url: requestUrl,
      headers: this.headersObject,
      data: accountData,
    };

    let response = {};

    try {
      response = await axios(axiosConfig);
      return response.data;
    } catch (error) {
      console.error(error.response.data);
    }
  }

  /**
   * @description - Takes a search query and returns an array of deal objects
   * @param {string} searchParam - The search query you want to use to retrieve deals
   * @returns {Promise<{}[]>}
   */
  async searchForDeals(searchParam) {
    const requestUrl = `${this.apiBaseUrl}search?q=${searchParam}&include=deal`;

    const axiosConfig = {
      method: "get",
      url: requestUrl,
      headers: this.headersObject,
    };

    const axiosResponse = await axios(axiosConfig);

    return axiosResponse.data;
  }

  /**
   * @description - Fetches a single deal from Freshworks CRM based on a deal id.
   * @param {string} id
   * @returns {Promise<{any}>}
   */
  async getDeal(id) {
    const requestUrl = `${this.apiBaseUrl}deals/${id}?include=owner&include=deal_stage&include=contacts`;

    const axiosConfig = {
      method: "get",
      url: requestUrl,
      headers: this.headersObject,
    };

    const axiosResponse = await axios(axiosConfig);

    return axiosResponse.data;
  }

  /**
   * @description - Creates a new deal in Freshworks.
   * @description - Returns the contents of the deal
   * @param {string} name
   * @param {number} amount
   * @param {string} sales_account_id
   * @param {string} deal_stage_id
   * @param {string} deal_type_id
   * @param {string} owner_id
   * @param {string} deal_pipeline_id
   * @param {number} contactId
   * @returns {Promise<{}>}
   */
  async createDeal({
    name = "",
    amount = 0,
    sales_account_id = "",
    deal_stage_id = "",
    deal_type_id = "",
    owner_id = "",
    deal_pipeline_id = "",
    contactId = 0,
  } = {}) {
    let dealData = {
      name: name,
      amount: amount,
      sales_account_id: sales_account_id,
      deal_stage_id: deal_stage_id,
      deal_type_id: deal_type_id,
      owner_id: owner_id,
      deal_pipeline_id: deal_pipeline_id,
      contact_ids: [contactId],
    };

    const requestUrl = `${this.apiBaseUrl}deals`;

    const axiosConfig = {
      method: "post",
      url: requestUrl,
      headers: this.headersObject,
      data: dealData,
    };

    let response = {};

    try {
      response = await axios(axiosConfig);
      return response.data;
    } catch (error) {
      console.error(error.response.data.errors.message);
    }
  }

  /**
   * @description - Updates a deal in Freshworks.
   * @description - Returns the contents of the deal.
   * @param {string} id
   * @param {string} [name]
   * @param {number} [amount]
   * @param {string} [sales_account_id]
   * @param {string} [deal_stage_id]
   * @param {string} [deal_type_id]
   * @param {string} [owner_id]
   * @param {string} [deal_pipeline_id]
   * @param {number[]} [contactIds]
   * @returns {Promise<any>}
   */
  async updateDeal({
    id = "",
    name,
    amount,
    sales_account_id,
    deal_stage_id,
    deal_type_id,
    owner_id,
    deal_pipeline_id,
    contactIds,
  }) {
    let dealData = {};

    if (name) dealData.name = name;
    if (amount) dealData.amount = amount;
    if (sales_account_id) dealData.sales_account_id = sales_account_id;
    if (deal_stage_id) dealData.deal_stage_id = deal_stage_id;
    if (deal_type_id) dealData.deal_type_id = deal_type_id;
    if (owner_id) dealData.owner_id = owner_id;
    if (deal_pipeline_id) dealData.deal_pipeline_id = deal_pipeline_id;
    if (contactIds) dealData.contactIds = contactIds;

    const requestUrl = `${this.apiBaseUrl}deals/${id}`;

    const axiosConfig = {
      method: "put",
      url: requestUrl,
      headers: this.headersObject,
      data: dealData,
    };

    let response = {};

    try {
      response = await axios(axiosConfig);
      return response.data;
    } catch (error) {
      console.error(error.response.data.errors.message);
    }
  }

  /**
   * @description - Creates a new note in Freshworks.
   * @description - Returns the contents of the note
   * @param {string} description - Content of the note.
   * @param {string} targetableId - ID of the record that the note is attached to.
   * @param {string} targetableType - The type of the record that the note is being attached to [Contact, SalesAccount, Deal]
   * @returns {Promise<{}>}
   */
  async createNote({
    description = "",
    targetableId = "",
    targetableType = "",
  } = {}) {
    let noteData = {
      description: description,
      targetable_id: targetableId,
      targetable_type: targetableType,
    };

    const requestUrl = `${this.apiBaseUrl}notes`;

    const axiosConfig = {
      method: "post",
      url: requestUrl,
      headers: this.headersObject,
      data: noteData,
    };

    let response = {};

    try {
      response = await axios(axiosConfig);
      return response.data;
    } catch (error) {
      console.error(error.response.data.errors.message);
    }
  }
}

module.exports = FreshWorksCrm;
