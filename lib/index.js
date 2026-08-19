/**
 * Host half of the DSH 鲸鱼娘 persona plugin.
 * The persona is delivered as a cordis patch (see cordis.patch.yml) that
 * overrides the `system-prompt` deployment persona, so this host entry only
 * satisfies the loader contract.
 */
const inject = []
function apply() {}
export { apply, inject }
