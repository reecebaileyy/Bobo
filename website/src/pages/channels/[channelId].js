import { Flex, View } from '@aws-amplify/ui-react'

export default function({ currentChannel = {}, channels = [] }) {
    <>
        <Flex direction={{base: 'column', medium: 'row'}}>
            <ConversationBar channels={channels}/>
            <View></View>
        </Flex>
    </>
}

export async function getStaticPaths() {
    const paths = mockChannels.map(({ channelId }) => ({ params: { channelId } }))
        console.log('these are the paths', paths)
        return {
            paths,
            fallback: true, //if someone created a channel since the last build
        }
}

export async function getStaticProps({ params }) {
    console.log('these are the params', params)
    const channel = mockChannels.find(
        (mckChnl) => mckChnl.channelId == params.channelId
    )

    return {
        props: {
            currentChannel: channel,
            channels: mockChannels,
        },
        revalidate: 10,
    }
}

