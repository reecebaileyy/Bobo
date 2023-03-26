import {
        Table,
        TableBody,
        TableCell,
        TableHead,
        TableRow,
        View 
    } from "@aws-amplify/ui-react"

export const ChannelList = ({handleMenuToggle, channels=[]}) => {
    return (
        <View>
            <Table variation="striped" highlightOnHover>
                <TableHead>
                    <TableRow>
                        <TableCell as="th">Channels</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {channels.map((channel) => (
                        <TableRow
                            key={channel.channelId}
                            onClick={() => {
                                handleMenuToggle(channel.channelId)
                            }}
                        >
                            <TableCell>{channel.name}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </View>
    )
}