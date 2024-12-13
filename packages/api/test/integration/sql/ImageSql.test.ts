import { afterAll, beforeAll, describe, it } from '@jest/globals';
import { Connection } from 'mysql2/promise';
import Helper from '../Helper';
import ImageSql from '../../../src/sql/ImageSql.ts'

let db: Connection

beforeAll(async() => {
    db = await Helper.getConnexion()
})

afterAll(async () => {
    if(db) await db.end()
})

const minimal = {
    id: 2,
    alt: 'minimal-image',
    data: Buffer.from( // database/resources/minimal-image.png
        '89504e470d0a1a0a0000000d494844520000007f00000061' +
        '0803000000c8bf8eca00000213504c5445ffffff4f4f4f00' +
        '00008b8b8bebebeb040404fbfbfb535353434343d3d3d3c3' +
        'c3c39393930303030a0a0a313131969696090909bababab3' +
        'b3b3eeeeee979797e7e7e7464646d7d7d73e3e3e4141415e' +
        '5e5e2f2f2f7d7d7de4e4e401010186868616161692929277' +
        '77770d0d0d4b4b4be8e8e85656565555551a1a1a4d4d4def' +
        'efef7676761313131212126d6d6dcacaca4444441111110b' +
        '0b0b353535bbbbbb5b5b5b8585852424248d8d8d2d2d2dab' +
        'abab1b1b1b1f1f1ff5f5f5dddddd1919196a6a6a1c1c1c73' +
        '7373f3f3f3c5c5c52b2b2b8e8e8eaeaeaeb9b9b9f7f7f751' +
        '5151cececed5d5d5727272dfdfdf424242636363101010f8' +
        'f8f8292929888888fcfcfce2e2e2a9a9a93a3a3a707070dc' +
        'dcdcdedede3333333f3f3f232323787878afafaf34343494' +
        '9494fdfdfd8484843838387b7b7b3b3b3bd4d4d4050505e6' +
        'e6e6fefefeeaeaeac1c1c12c2c2c9191918989890c0c0ce3' +
        'e3e34949495a5a5a0202027c7c7c141414a3a3a3b5b5b59c' +
        '9c9ce5e5e5575757181818676767f0f0f09b9b9b1515150f' +
        '0f0f5d5d5df2f2f28181816f6f6f0707073030302121212a' +
        '2a2ab7b7b7666666cccccc4e4e4e282828d9d9d9797979cf' +
        'cfcf6b6b6be0e0e0484848cbcbcb222222c9c9c9d8d8d8c8' +
        'c8c8a6a6a67f7f7f7a7a7a3737376e6e6e2727270e0e0efa' +
        'fafa4c4c4c3c3c3cd1d1d1dadada838383b4b4b425252506' +
        '0606323232393939edededf1f1f1d2d2d24040408ce49bb9' +
        '0000027849444154789cedd8e953525118c0e1b7938a1204' +
        'a52468a0426821625e222a320ab0b254c4ca161512b7f64d' +
        '48b2456d11cb4a93242adbb37dfb133b17987b3f197eb817' +
        'a7f1fd7de05cce817966803bf30e00188661188661188661' +
        '188661d8b26d0559995c7372491e48f2f98302225de02dab' +
        '6442faf2d5c955a1a4fe9ab5fc4161912a2bfe3a52ccae6a' +
        '0df51797b07e49e97aba687565e9cfbfbc425f6ed8604c7e' +
        'fe95558a8dca4da66a738d85bea676731d63dd22b46fdb6a' +
        'a7cbb6ed3bd2be636745fd2ee7eea46fdbe3727b640d7beb' +
        'f791fdd05873e0605333a315da6f21b500d632cef7d2dd56' +
        '6bcaf7b501941ea21be6c370a4dd0de0264785f6e1d87138' +
        'a1ebe0fc66baebb2a7fc4e7add25a10ffe00c0c96e2521a4' +
        '48703fe8ece9ed03ceef677d7fca1f607d1bebebe1d469cb' +
        '99b37922f8e772cf5fb898d9bf7499de205744f061301456' +
        '65f6af0ed1b5972884f72332ea66f4af91e1ebc11b376f8d' +
        '08eebbe5a38bf0213076fbcedd7bccb8a03e8661cbb7fe28' +
        'fa4bed2bc6a40dd18982c87d6630871ff3403a117d3039f0' +
        '10e091576e78dc219e3f1aad5269fd53a1c269f3137ecc33' +
        'f934339e6e670c9e1a6667e2ea678de2f92401304e8c0092' +
        '597ecc8b90e7002f480caa0d2680f6f04b117d4ace99e9b3' +
        'd63e7ecc7bc5b0e7e61868bad80bbb45449f4e56730ed67f' +
        'cd8f796fd80d781b83ce7094a6abcc8ecf8d79fa77ecf950' +
        '0cbcea62366d767c6ecc1b262d0071fafd071cefe9d6744f' +
        '767c6ecc332a3f34253e267fffa1f94f9f65f1ecf8dc9807' +
        '5fbe7efbee9972d1fb3f5fcefc981485ff573fe91ddfc604' +
        'b3eea6fbe593ccff2e312cf42f80f825fe18ea348925e331' +
        '0cc3300cc3300cc3febbfe02f0ada468e0e13fc900000000' +
        '49454e44ae426082',
        'hex'
      )
}
const simple = {
    id: 3,
    alt: 'simple-image',
    data: Buffer.from( // database/resources/simple-image.png
        '89504e470d0a1a0a0000000d494844520000007f00000061' +
        '0803000000c8bf8eca00000252504c5445ffffffffc0ca' +
        'ff4a68ff1b41ff062fff193fff506dffcbd4ffd3daff00' +
        '2affc3cdff93a5ff032dffb7c3ff022cff5a75ffb9c5ff' +
        'cdd5ffadbbff3758ff0b33ffd7deffeef1ff97a8ffe7eb' +
        'ff5470ff2c4ffff2f4ff2b4eff98a9ff2f51ff5672ff55' +
        '71ff96a7ff1a40ff0932ff4d6affeff2ff768dff133aff' +
        '1239ff6d85ff8da0ff1138ffbbc6ff2146ffa3b2fffbfc' +
        'ff7d92ff1e43ff2448ff9cacff516effc6cffffcfcff5b' +
        '76ff1c41ff738afff3f5ffc5cfff8ea1fff5f7ffaebbff' +
        '92a4ff042dff4463ffdee3ff748bffd1d9ff0a32ff9faf' +
        'ffdae0ff9aabff8095ff0e36ff99aaff1037fff8f9ff29' +
        '4cff889cffbcc7fffafbff0d35ff798ffff0f2ff647eff' +
        '264afff4f6ffb0bdff284bffd5dcff3355ff3f5fff536f' +
        'ff2347ff788effc1cbffbfcaffa4b3ffecefffbec9ff49' +
        '67ff3b5bff778dfffefeff3d5dff4765ffb3c0ff0730ff' +
        '052effd6ddffe5e9ff637dff3052ffc2ccffaab8ffe8ec' +
        'ff3e5eff3153ffb5c1fff6f7fff1f3ff95a6ffeaedff75' +
        '8cff627cffb2bfff4e6bff012bff607aff143bffa9b7ff' +
        'dfe4ffa2b1ff163cff1f44ffc4ceff2246ff6b83ff7b91' +
        'ff153cffebeeffcad3ff3556ff2a4dff667fffccd4ff42' +
        '61ff9babffe4e8ffd9dffff7f8ffced6ff7289ff4160ff' +
        'cfd7ff3455ffe0e5ff4866ffc9d2ff6f87ffe2e7ffd8de' +
        'ffc8d1ffa6b5ff7f94ff3859ffafbcff7a90ffd4dbffe6' +
        'eaff6e86ff274bff899cff0c34ffe3e8ff7c92ff8498ff' +
        'fdfdff94a6ff5773ff183eff6780ff4c69ff3c5cff8397' +
        'ff0f37ff5d78ff8196ffb4c0ff2549ff3254ff4362ff39' +
        '5affedf0ffd2d9ff5e79ff405f5fe9c5f3000002d24944' +
        '4154789cedd8e757d35018c0e1575a28174a4108435b19' +
        '22945a9650591505a4a2082a0507a31454960601a1202' +
        'e1070507122a08014dc7be1def3fff2de16f954f894143' +
        'dbebf0fc9cd4dce7972d2a64d0b8061188661188661188' +
        '661ff638bdc2452770f198027f19ae3106fb978bc8fc2d' +
        '76fb17f00170841c1210be02f59ca964ad5b2798e11d3f' +
        '708fd3362d73f2c3c6279e48aa868758c0660a53656258' +
        'd8b77f80989aba449dec2fbc944b73a65d64f4d4bcfd0c' +
        'b556b32d7123f5897959da35cafc8b5fb1ac386bc60e94' +
        '6e14f601347f2dd3667cef8058500a15be8b47a2b78936' +
        'd0045c662e6974813e9e4f61dc2fbb07397a694a49539f' +
        'c723a5161a28b4a33f5957450ae637e15a9a6e3dd648f0' +
        '82740dbabad71f8b5cc4f657e1df5ebe9a0611ff3f7132' +
        '9cff38de480d07293d2be6a7677e607d1418b89f907496' +
        'b20ab5060be2dcb6c5f5bda9df91d00870c89ccefe40fd' +
        '3c923c25ffea3e4d871bd7f5777ab133faba12aef843cd' +
        '0f1feefe9edab0eed12dc87939653fc69dd1970e6ebdba' +
        '5fdbdb3f77fa3c49a21bc3f77627eeca18f617f416779f' +
        '417da8f18f052f12d9ef1715ccd3980f3d95aee422cdde' +
        '5d5c25ff4a9bd047079d060ecca11cfbfc287870c5596f' +
        'a060dab8b61244677b5ec1a37045105a363fa71772b5c3' +
        '74e8cc92cfd23e2f9c4063049da004c13903245bfe4324' +
        '82fc4931b00378915a28d5100538a5b22fa94bcada65bc' +
        'd7700ee8e47124282e11ec7f6abad305ac106491a11fd0' +
        '4ea4b981f00f71b350fea13a8ff904dc0232b942be8a31' +
        'fdf1de61afff113baf194fa75f96c7f8f15062df647bf2' +
        '1d7f8cf7ae8fa3989a0bf4cfa0064f4f5374b8ae8d4f00' +
        'bd7f81d24b969fae5abd7256d916fca6c6fedef7fdfdcb' +
        'c7772996b7c300fbcffa0fcc84dc2a7cfd22ffad2747af' +
        'f7f3570df7c44e1e7eb3bbde30bb96997bb33751698727' +
        'ffc34cef5a780f8d97e19b5a3b605e3310cc3300cc3300' +
        'cc3300cfb47fb0db1c0ac4a4e89d5000000000049454e4' +
        '4ae426082',
        'hex',
      ),
    caption: 'Simple image'
}

describe('ImageSql', () => { 
    describe('when IMAGE are loaded with keys', () => {
        describe('and the keys are: 2, 3', () => {
            it('sould return: minimal and simple', async() => {
                const imageSql = new ImageSql(db)
                const images = await imageSql.findByIds([2, 3])

                Helper.expectArray(images, [minimal, simple])
            })
        })
    })
 })
