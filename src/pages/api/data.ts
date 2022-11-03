// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  courses: {
    name: string
    lessons: {
      id: string
      name?: string
    }[]
  }[]
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({
    courses: [
      {
        name: 'No English no Brain',
        lessons: [
          {
            id: 'WmV31ypcc3w',
            name: 'Esse video é brabo!',
          },
          {
            id: 'sMpyCkKuDU',
            name: 'treine seu ouvido e saia do Intermediate',
          },
          {
            id: 'yzycUfVwXi0',
            name: '1 HORA de LISTENING sem dó',
          },
          {
            id: 'dra6Dxp-2Xk',
            name: 'Vixi... se fosse tu clicava agora!!!',
          },
        ],
      },
      {
        name: 'RegEx para idiotas',
        lessons: [
          {
            id: 'TVIZoqBjwNQ',
            name: 'é assim que começa...',
          },
          {
            id: 'Tbpn64yUG7c',
            name: 'Como fazer as coisas!',
          },
          {
            id: 'yzycUfVwXi0',
            name: 'só sai desse video entendendo Regex',
          },
          {
            id: 'dra6Dxp-2Xk',
            name: 'só assista e depois me agradeça...',
          },
        ],
      },
      {
        name: 'Cerâmica milionária',
        lessons: [
          {
            id: 'WmV31ypcc3w',
            name: 'como fazer jarros que CUSTAM MILHÕES',
          },
          {
            id: 'sMpyCkKuDU',
            name: 'GANHE DINHEIRO BRINCANDO COM LAMA!!',
          },
          {
            id: 'yzycUfVwXi0',
            name: 'COMO EU USEI LAMA E FIQUEI RICA!!',
          },
          {
            id: 'dra6Dxp-2Xk',
            name: 'QUEBRE SEU VASO E FIQUE MILIONÁRIA HOJE!!',
          },
        ],
      },
    ],
  })
}
