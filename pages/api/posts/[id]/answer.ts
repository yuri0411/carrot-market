import { NextApiRequest, NextApiResponse } from 'next'
import withHandler, { ResponseType } from '@libs/server/withHandler'
import client from '@libs/server/client'
import { withApiSession } from '@libs/server/withSession'

async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseType>,
) {
    const {
        query: { id },
        session: { user },
        body: { answer },
    } = req

    const newAnswer = await client.answer.create({
        data: {
            user: {
                connect: {
                    id: user?.id,
                },
            },
            post: {
                connect: {
                    id: +id.toString(),
                },
            },
            answer,
        },
    })

    console.log('newAnswer', newAnswer)
    // todo post가 있는지 확인후 없으면 404 return

    res.json({
        ok: true,
        answer: newAnswer,
    })
}

export default withApiSession(withHandler({ methods: ['POST'], handler }))
