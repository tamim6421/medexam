export const BASE_URL_IMAGE = 'https://medexam1.amaderthikana.com/uploads/admin'

import { useAuth } from '../hooks/use-auth'

export const useEndpoints = () => {
  const { getEndpoint, getDownloadEndpoint } = useAuth()

  const PAGE_CATEGORY_ENDPOINTS = {
    list: getEndpoint('pagecategory'),
    add: getEndpoint('pagecategory-add'),
    update: (id) => getEndpoint(`pagecategory-update/${id}`),
    delete: (id) => getEndpoint(`pagecategory-delete/${id}`)
  }

  const PAGE_ENDPOINTS = {
    list: getEndpoint('page'),
    add: getEndpoint('page-add'),
    update: (id) => getEndpoint(`page-update/${id}`),
    delete: (id) => getEndpoint(`page-delete/${id}`)
  }

  const PROFILE_ENDPOINTS = {
    get: getEndpoint('member/profile'),
    update: (id) => getEndpoint(`member/profile-update/${id}`),
    changePassword: (id) => getEndpoint(`member/change-password/${id}`),
    uploadImage: getEndpoint('member/upload-image')
  }

  const QUESTION_ENDPOINTS = {
    getSlotList: (courseId, slotNumber, page = 1) => 
      getEndpoint(`${courseId}/slot-list?slot_number=${slotNumber}&sortField=id&sortDirection=asc&perPage=1&page=${page}`),
    submitAnswer: (courseId) => getEndpoint(`${courseId}/question-answer`)
  }
  

  return {
    PAGE_CATEGORY_ENDPOINTS,
    PAGE_ENDPOINTS,
    PROFILE_ENDPOINTS,
    QUESTION_ENDPOINTS
  }
} 