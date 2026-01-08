import express from 'express'
import { requireAuth, } from '../middleware/requireAuth.js'
import { adminOnly } from '../middleware/adminOnly.js'

import { 
  getAllMessages, 
  updateMessages, 
  deleteMessages } from '../controllers/adminMessagesController.js'

export const adminMessagesRouter = express.Router()

adminMessagesRouter.get('/', requireAuth, adminOnly, getAllMessages)
adminMessagesRouter.patch('/:id', requireAuth, adminOnly, updateMessages)
adminMessagesRouter.delete('/:id', requireAuth, adminOnly, deleteMessages)