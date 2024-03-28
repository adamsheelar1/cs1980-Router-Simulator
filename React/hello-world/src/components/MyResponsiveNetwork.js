// install (please try to align the version of installed @nivo packages)
// yarn add @nivo/network
import { ResponsiveNetwork } from '@nivo/network'

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const MyResponsiveNetwork = ({ data /* see data tab */ }) => (
    <ResponsiveNetwork
        data={data}
        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
        linkDistance={e=>e.distance}
        centeringStrength={0.3}
        repulsivity={6}
        nodeSize={n=>n.size}
        activeNodeSize={n=>1.5*n.size}
        nodeColor={e=>e.color}
        nodeBorderWidth={1}
        nodeBorderColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    '1.5'
                ]
            ]
        }}
        linkThickness={n=>2+2*n.target.data.height}
        linkColor={{ from: 'source.color', modifiers: [] }}
        linkBlendMode="lighten"
        motionConfig="wobbly"
    />
);
export default MyResponsiveNetwork;