import { NextApiRequest, NextApiResponse } from 'next'
import withHandler from '@libs/server/withHandler'
import client from '@libs/server/client'

async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { phone, email } = req.body
    const payload = phone ? { phone: +phone } : { email }

    const token = await client.token.create({
        data: {
            payload: '1234',
            user: {
                connectOrCreate: {
                    where: { ...payload },
                    create: {
                        name: 'Anonymous',
                        ...payload,
                    },
                },
            },
        },
    })

    console.log('user', token)
    return res.json({ ok: true })
}

export default withHandler('POST', handler)
