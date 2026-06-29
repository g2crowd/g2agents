import { eveChannel } from 'eve/channels/eve'
import { localDev, none, vercelOidc } from 'eve/channels/auth'

export default eveChannel({
  auth: [
    vercelOidc(),
    localDev(),
    // Public demo access. The tools in this prototype are read/draft-only.
    none(),
  ],
})
