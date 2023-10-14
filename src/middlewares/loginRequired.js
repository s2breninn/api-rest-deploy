import jwt from 'jsonwebtoken'
import User from '../models/User'

export default async(req, res, next) => {
  const { authorization } = req.headers

  if(!authorization) {
    return res.status(401).json({
      errors: ['Login required']
    })
  }

  const [ token ] = authorization.split(' ')

  try{
    const dados = jwt.verify(token, process.env.TOKEN_SECRET)
    const { id, email } = dados

    const user = await User.findOne({
      where:{
        id,
        email
      },
    })

    if(!user){
      return res.status(401).json({
        errors: ['Usário inválido']
      })
    }

    req.userId = id
    req.userEmail = email
    return next()
  }catch(e) {
    return res.status(401).json({
      errors: ['Token expirado ou inválido']
    })
  }
}

//Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiZW1haWwiOiJiLm1lbmRlc2Jlcm5hcmRvMjAyMEBnbWFpbC5jb20iLCJpYXQiOjE2OTYxOTk5OTAsImV4cCI6MTY5NjgwNDc5MH0.LZXQzXPjTMzXK2wX1E7LuFLQVupeS9IS4u0HpGF_7xo
//       eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiZW1haWwiOiJiLm1lbmRlc2Jlcm5hcmRvMjAyMEBnbWFpbC5jb20iLCJpYXQiOjE2OTYyMDI0ODAsImV4cCI6MTY5NjgwNzI4MH0.gqzbqUU09rfxgi-Xzob2s2I6o_H3J28t26VqCXLLmkg