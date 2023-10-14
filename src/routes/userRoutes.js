import { Router } from   'express'
import userController from '../controllers/UserController'
import loginRequired from '../middlewares/loginRequired'

const router = new Router()

//Não pode existir
router.get('/', loginRequired, userController.index) //Lista usuário
router.get('/:id', userController.show)

router.post('/', userController.store)
router.put('/:id', loginRequired, userController.update)
router.delete('/', loginRequired, userController.delete)

export default router