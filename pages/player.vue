<template>
    <div style="height:100%;">
        <Menu />
        <b-container class="control-container">
            <b-row class="control-row">
                <b-col cols="3" class="player-col">
                    <b-aspect aspect="16:9">
                        <video-player v-if="videoOptions.sources" :key="configID" reference="videoPlayer" :options="videoOptions" />
                    </b-aspect>
                </b-col>
                <b-col class="control-col">
                    <b-row class="control-col">
                        <b-col cols="8" class="status-col">
                            <b-row class="status-row">
                                <b-col class="time-col clock-col">
                                    <div class="time-str">
                                        {{ timeStr }}
                                    </div>
                                </b-col>
                                <b-col class="time-col counter-col">
                                    <div class="time-str">
                                        {{ timeLeft }}
                                    </div>
                                </b-col>
                                <div class="w-100" />
                                <b-col class="current-clip" align-self="end">
                                    <div class="current-clip-text">
                                        {{ currentClip | filename }}
                                    </div>
                                    <div class="current-clip-meta">
                                        <strong>Duration:</strong> {{ $secToHMS(currentClipDuration) }} | <strong>In:</strong> {{ $secToHMS(currentClipIn) }} | <strong>Out:</strong> {{ $secToHMS(currentClipOut) }}
                                    </div>
                                    <div class="current-clip-progress">
                                        <b-progress :value="progressValue" variant="warning" />
                                    </div>
                                </b-col>
                            </b-row>
                        </b-col>
                        <b-col cols="4" class="control-unit-col">
                            <b-row class="control-unit-row">
                                <b-col>
                                    <div>
                                        <b-button
                                            title="Start Playout Service"
                                            class="control-button control-button-play"
                                            :class="isPlaying"
                                            variant="primary"
                                            @click="playoutControl('start')"
                                        >
                                            <b-icon-play />
                                        </b-button>
                                    </div>
                                </b-col>
                                <b-col>
                                    <div>
                                        <b-button
                                            title="Stop Playout Service"
                                            class="control-button control-button-stop"
                                            variant="primary"
                                            @click="playoutControl('stop')"
                                        >
                                            <b-icon-stop />
                                        </b-button>
                                    </div>
                                </b-col>
                                <div class="w-100" />
                                <b-col>
                                    <div>
                                        <b-button
                                            title="Reload Playout Service"
                                            class="control-button control-button-reload"
                                            variant="primary"
                                            @click="playoutControl('reload')"
                                        >
                                            <b-icon-arrow-repeat />
                                        </b-button>
                                    </div>
                                </b-col>
                                <b-col>
                                    <div>
                                        <b-button
                                            title="Restart Playout Service"
                                            class="control-button control-button-restart"
                                            variant="primary"
                                            @click="playoutControl('restart')"
                                        >
                                            <b-icon-arrow-clockwise />
                                        </b-button>
                                    </div>
                                </b-col>
                            </b-row>
                        </b-col>
                    </b-row>
                </b-col>
            </b-row>
            <b-row class="date-row">
                <b-col>
                    <b-datepicker v-model="listDate" size="sm" class="date-div" offset="-35px" />
                </b-col>
            </b-row>
            <splitpanes class="list-row default-theme pane-row">
                <pane min-size="20" size="24">
                    <loading
                        :active.sync="isLoading"
                        :can-cancel="false"
                        :is-full-page="false"
                        background-color="#485159"
                        color="#ff9c36"
                    />

                    <div v-if="folderTree.tree" class="browser-div">
                        <div>
                            <b-breadcrumb>
                                <b-breadcrumb-item
                                    v-for="(crumb, index) in crumbs"
                                    :key="crumb.key"
                                    :active="index === crumbs.length - 1"
                                    @click="getPath(extensions, crumb.path)"
                                >
                                    {{ crumb.text }}
                                </b-breadcrumb-item>
                            </b-breadcrumb>
                        </div>

                        <perfect-scrollbar :options="scrollOP" class="player-browser-scroll">
                            <b-list-group>
                                <b-list-group-item
                                    v-for="folder in folderTree.tree[1]"
                                    :key="folder.key"
                                    class="browser-item"
                                >
                                    <b-link @click="getPath(extensions, `/${folderTree.tree[0]}/${folder}`)">
                                        <b-icon-folder-fill class="browser-icons" /> {{ folder }}
                                    </b-link>
                                </b-list-group-item>
                                <draggable
                                    :list="folderTree.tree[2]"
                                    :clone="cloneClip"
                                    :group="{ name: 'playlist', pull: 'clone', put: false }"
                                    :sort="false"
                                >
                                    <b-list-group-item
                                        v-for="file in folderTree.tree[2]"
                                        :key="file.key"
                                        class="browser-item"
                                    >
                                        <b-row>
                                            <b-col cols="1" class="browser-icons-col">
                                                <b-icon-film class="browser-icons" />
                                            </b-col>
                                            <b-col class="browser-item-text grabbing">
                                                {{ file.file }}
                                            </b-col>
                                            <b-col cols="1" class="browser-play-col">
                                                <b-link @click="showPreviewModal(`/${folderTree.tree[0]}/${file.file}`)">
                                                    <b-icon-play-fill />
                                                </b-link>
                                            </b-col>
                                            <b-col cols="1" class="browser-dur-col">
                                                <span class="duration">{{ file.duration | toMin }}</span>
                                            </b-col>
                                        </b-row>
                                    </b-list-group-item>
                                </draggable>
                            </b-list-group>
                        </perfect-scrollbar>
                    </div>
                </pane>
                <pane>
                    <div class="playlist-container">
                        <b-list-group class="list-group-header">
                            <b-list-group-item>
                                <b-row class="playlist-row">
                                    <b-col cols="1" class="timecode">
                                        Start
                                    </b-col>
                                    <b-col>
                                        File
                                    </b-col>
                                    <b-col cols="1" class="text-center playlist-input">
                                        Play
                                    </b-col>
                                    <b-col cols="1" class="timecode">
                                        Duration
                                    </b-col>
                                    <b-col cols="1" class="timecode">
                                        In
                                    </b-col>
                                    <b-col cols="1" class="timecode">
                                        Out
                                    </b-col>
                                    <b-col cols="1" class="text-center playlist-input">
                                        Ad
                                    </b-col>
                                    <b-col cols="1" class="text-center playlist-input">
                                        Delete
                                    </b-col>
                                </b-row>
                            </b-list-group-item>
                        </b-list-group>
                        <perfect-scrollbar id="scroll-container" :options="scrollOP">
                            <b-list-group class="playlist-list-group" :style="`height: ${(playlist) ? playlist.length * 52 + 52 : 300}px`">
                                <draggable
                                    id="playlist-group"
                                    v-model="playlist"
                                    group="playlist"
                                    @start="drag=true"
                                    @add="scrollEnd"
                                    @end="drag=false"
                                >
                                    <b-list-group-item
                                        v-for="(item, index) in playlist"
                                        :id="`clip_${index}`"
                                        :key="item.key"
                                        class="playlist-item"
                                        :class="index === currentClipIndex ? 'active-playlist-clip' : ''"
                                    >
                                        <b-row class="playlist-row">
                                            <b-col cols="1" class="timecode">
                                                {{ item.begin | secondsToTime }}
                                            </b-col>
                                            <b-col class="grabbing">
                                                {{ item.source | filename }}
                                            </b-col>
                                            <b-col cols="1" class="text-center playlist-input">
                                                <b-link @click="showPreviewModal(item.source)">
                                                    <b-icon-play-fill />
                                                </b-link>
                                            </b-col>
                                            <b-col cols="1" text class="timecode">
                                                {{ item.duration | secondsToTime }}
                                            </b-col>
                                            <b-col cols="1" class="timecode">
                                                <b-form-input :value="item.in | secondsToTime" size="sm" @input="changeTime('in', index, $event)" />
                                            </b-col>
                                            <b-col cols="1" class="timecode">
                                                <b-form-input :value="item.out | secondsToTime" size="sm" @input="changeTime('out', index, $event)" />
                                            </b-col>
                                            <b-col cols="1" class="text-center playlist-input">
                                                <b-form-checkbox
                                                    v-model="item.category"
                                                    value="advertisement"
                                                    :unchecked-value="item.category"
                                                />
                                            </b-col>
                                            <b-col cols="1" class="text-center playlist-input">
                                                <b-link @click="removeItemFromPlaylist(index)">
                                                    <b-icon-x-circle-fill />
                                                </b-link>
                                            </b-col>
                                        </b-row>
                                    </b-list-group-item>
                                </draggable>
                            </b-list-group>
                        </perfect-scrollbar>
                    </div>
                </pane>
            </splitpanes>
            <b-button-group class="media-button">
                <b-button v-b-tooltip.hover title="Reset Playlist" variant="primary" @click="resetPlaylist()">
                    <b-icon-arrow-counterclockwise />
                </b-button>
                <b-button v-b-tooltip.hover title="Copy Playlist" variant="primary" @click="showCopyModal()">
                    <b-icon-files />
                </b-button>
                <b-button v-b-tooltip.hover title="Loop Clips in Playlist" variant="primary" @click="loopClips()">
                    <b-icon-view-stacked />
                </b-button>
                <b-button v-b-tooltip.hover title="Save Playlist" variant="primary" @click="savePlaylist(listDate)">
                    <b-icon-download />
                </b-button>
                <b-button v-b-tooltip.hover title="Delete Playlist" variant="primary" @click="showDeleteModal()">
                    <b-icon-trash />
                </b-button>
            </b-button-group>
        </b-container>
        <b-modal
            id="preview-modal"
            ref="prev-modal"
            size="xl"
            centered
            :title="`Preview: ${previewSource}`"
            hide-footer
        >
            <video-player v-if="previewOptions" reference="previewPlayer" :options="previewOptions" />
        </b-modal>
        <b-modal
            id="copy-modal"
            ref="copy-modal"
            centered
            :title="`Copy Program ${listDate} to:`"
            content-class="copy-program"
            @ok="savePlaylist(targetDate)"
        >
            <b-calendar v-model="targetDate" locale="en-US" class="centered" />
        </b-modal>
        <b-modal
            id="delete-modal"
            ref="delete-modal"
            centered
            title="Delete Program"
            content-class="copy-program"
            @ok="deletePlaylist(listDate)"
        >
            Delete program from {{ listDate }}
        </b-modal>
    </div>
</template>

<script>
/* eslint-disable vue/custom-event-name-casing */
import { mapState } from 'vuex'
import Menu from '@/components/Menu.vue'

function scrollTo (t) {
    let child
    if (t.currentClipIndex === null) {
        child = document.getElementById('clip_0')
    } else {
        child = document.getElementById(`clip_${t.currentClipIndex}`)
    }

    if (child) {
        const parent = document.getElementById('scroll-container')
        const topPos = child.offsetTop
        parent.scrollTop = topPos - 50
    }
}

export default {
    name: 'Player',

    components: {
        Menu
    },

    filters: {
        secondsToTime (sec) {
            return new Date(sec * 1000).toISOString().substr(11, 8)
        }
    },

    middleware: 'auth',

    data () {
        return {
            isLoading: false,
            isPlaying: '',
            listDate: this.$dayjs().tz(this.timezone).format('YYYY-MM-DD'),
            targetDate: this.$dayjs().tz(this.timezone).format('YYYY-MM-DD'),
            interval: null,
            extensions: '',
            videoOptions: {
                liveui: true,
                controls: true,
                suppressNotSupportedError: true,
                autoplay: false,
                preload: 'auto',
                sources: []
            },
            previewOptions: {},
            previewComp: null,
            previewSource: '',
            scrollOP: {
                suppressScrollX: true,
                minScrollbarLength: 30
            }
        }
    },

    computed: {
        ...mapState('config', ['configID', 'configGui', 'configPlayout', 'timezone', 'startInSec']),
        ...mapState('media', ['crumbs', 'folderTree']),
        ...mapState('playlist', [
            'timeStr', 'timeLeft', 'currentClip', 'progressValue', 'currentClipIndex',
            'currentClipDuration', 'currentClipIn', 'currentClipOut']),
        playlist: {
            get () {
                return this.$store.state.playlist.playlist
            },
            set (list) {
                this.$store.commit('playlist/UPDATE_PLAYLIST', this.$processPlaylist(this.startInSec, list))
            }
        }
    },

    watch: {
        listDate () {
            this.getPlaylist()
            setTimeout(() => { scrollTo(this) }, 5000)
        },

        configID (id) {
            this.videoOptions.sources = [
                {
                    type: 'application/x-mpegURL',
                    src: this.configGui[id].player_url
                }
            ]

            this.getPath(this.extensions, '')
            this.getPlaylist()
            setTimeout(() => { scrollTo(this) }, 3000)
        }
    },

    async created () {
        this.videoOptions.sources = [
            {
                type: 'application/x-mpegURL',
                src: this.configGui[this.configID].player_url
            }
        ]

        this.getStatus()
        this.extensions = this.configPlayout.storage.extensions.join(',')
        await this.getPath(this.extensions, '')

        const timeInSec = this.$timeToSeconds(this.$dayjs().tz(this.timezone).format('HH:mm:ss'))
        const listStartSec = this.$timeToSeconds(this.configPlayout.playlist.day_start)

        if (listStartSec > timeInSec) {
            this.listDate = this.$dayjs(this.listDate).tz(this.timezone).subtract(1, 'day').format('YYYY-MM-DD')
        }

        await this.getPlaylist()
    },

    mounted () {
        if (process.env.NODE_ENV === 'production') {
            this.interval = setInterval(() => {
                this.$store.dispatch('playlist/animClock')
                this.getStatus()
            }, 5000)
        } else {
            this.$store.dispatch('playlist/animClock')
        }

        setTimeout(() => { scrollTo(this) }, 4000)
    },

    beforeDestroy () {
        clearInterval(this.interval)
    },

    methods: {
        async getPath (extensions, path) {
            this.isLoading = true
            await this.$store.dispatch('media/getTree', { extensions, path })
            this.isLoading = false
        },

        async getStatus () {
            const channel = this.configGui[this.configID].id
            const status = await this.$axios.post('api/player/system/', { run: 'status', channel })

            if (status.data.data && (status.data.data === 'RUNNING' || status.data.data === 'active')) {
                this.isPlaying = 'is-playing'
            } else {
                this.isPlaying = ''
            }
        },

        async playoutControl (state) {
            const channel = this.configGui[this.configID].id
            await this.$axios.post('api/player/system/', { run: state, channel })

            setTimeout(() => { this.getStatus() }, 1000)
        },

        async getPlaylist () {
            await this.$store.dispatch('playlist/getPlaylist', { date: this.listDate })
        },

        showPreviewModal (src) {
            const storagePath = this.configPlayout.storage.path
            const storagePathArr = storagePath.split('/')
            const storageRoot = storagePathArr.pop()
            src = '/' + src.substring(src.indexOf(storageRoot))
            this.previewSource = src.split('/').slice(-1)[0]
            const ext = this.previewSource.split('.').slice(-1)[0]
            this.previewOptions = {
                liveui: false,
                controls: true,
                suppressNotSupportedError: true,
                autoplay: false,
                preload: 'auto',
                sources: [
                    {
                        type: `video/${ext}`,
                        src: '/' + encodeURIComponent(src.replace(/^\//, ''))
                    }
                ]
            }
            this.$root.$emit('bv::show::modal', 'preview-modal')
        },

        cloneClip ({ file, duration }) {
            const storagePath = this.configPlayout.storage.path
            const storagePathArr = storagePath.split('/')
            const storageRoot = storagePathArr.pop()
            const sourcePath = `${storagePathArr.join('/')}/${this.folderTree.tree[0].substring(this.folderTree.tree[0].indexOf(storageRoot))}`

            return {
                source: `${sourcePath}/${file}`,
                in: 0,
                out: duration,
                duration
            }
        },

        scrollEnd (event) {
            if (event.newIndex + 1 === this.playlist.length) {
                const objDiv = document.getElementById('scroll-container')
                objDiv.scrollTop = objDiv.scrollHeight
            }
        },

        changeTime (pos, index, input) {
            if (input.match(/(?:[01]\d|2[0123]):(?:[012345]\d):(?:[012345]\d)/gm)) {
                const sec = this.$timeToSeconds(input)

                if (pos === 'in') {
                    this.playlist[index].in = sec
                } else if (pos === 'out') {
                    this.playlist[index].out = sec
                }

                this.$store.commit('playlist/UPDATE_PLAYLIST', this.$processPlaylist(this.startInSec, this.playlist))
            }
        },

        removeItemFromPlaylist (index) {
            this.playlist.splice(index, 1)

            this.$store.commit('playlist/UPDATE_PLAYLIST', this.$processPlaylist(this.startInSec, this.playlist))
        },

        async resetPlaylist () {
            await this.$store.dispatch('playlist/getPlaylist', { date: this.listDate })
        },

        loopClips () {
            const tempList = []
            let count = 0

            while (count < 86400) {
                for (const item of this.playlist) {
                    if (count < 86400) {
                        tempList.push(this.$_.cloneDeep(item))
                        count += item.out - item.in
                    } else {
                        break
                    }
                }
            }

            this.$store.commit('playlist/UPDATE_PLAYLIST', this.$processPlaylist(this.startInSec, tempList))
        },

        async savePlaylist (saveDate) {
            this.$store.commit('playlist/UPDATE_PLAYLIST', this.$processPlaylist(this.startInSec, this.playlist))

            const saveList = this.playlist.map(({ begin, ...item }) => item)

            await this.$axios.post(
                'api/player/playlist/',
                {
                    data: { channel: this.$store.state.config.configGui.channel, date: saveDate, program: saveList },
                    channel: this.configGui[this.configID].id
                }
            )
        },

        async deletePlaylist (playlistDate) {
            this.$store.commit('playlist/UPDATE_PLAYLIST', [])
            const date = playlistDate.split('-')
            const playlistPath = `${this.configPlayout.playlist.path}/${date[0]}/${date[1]}/${playlistDate}.json`

            await this.$axios.post('api/player/playlist/', { data: { delete: playlistPath } })
        },

        showCopyModal () {
            this.$root.$emit('bv::show::modal', 'copy-modal')
        },

        showDeleteModal () {
            this.$root.$emit('bv::show::modal', 'delete-modal')
        }
    }
}
</script>

<style lang="scss" scoped>
.control-container {
    width: auto;
    max-width: 100%;
    height: calc(100% - 40px);
}

.control-row {
    min-height: 254px;
}

.player-col {
    max-width: 542px;
    min-width: 380px;
    margin-bottom: 6px;
}

.control-col {
    height: 100%;
    min-height: 254px;
}

.status-col {
    padding-right: 30px;
}

.control-unit-col {
    min-width: 380px;
}

.control-unit-row {
    background: #32383E;
    height: 100%;
    margin-right: 0;
    border-radius: 0.25rem;
    text-align: center;
}

.control-unit-row .col {
    height: 50%;
    min-height: 90px;
}

.control-unit-row .col div {
    height: 80%;
    margin: .7em 0;
}

.control-button {
    font-size: 3em;
    line-height: 0;
    width: 80%;
    height: 100%;
}

.status-row {
    height: 100%;
    min-width: 370px;
}

.clock-col {
    margin-right: 3px;
}

.counter-col {
    margin-left: 3px;
}

.time-col {
    position: relative;
    background: #32383E;
    padding: .5em;
    text-align: center;
    border-radius: .25rem;
}

.time-str {
    position: relative;
    top: 50%;
    -webkit-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);
    font-family: 'DigitalNumbers-Regular';
    font-size: 4.5em;
    letter-spacing: -.18em;
    padding-right: 14px;
}

.current-clip {
    background: #32383E;
    height: calc(50% - 3px);
    padding: 10px;
    border-radius: 0.25rem;
}

.current-clip-text {
    height: 40%;
    padding-top: .5em;
    text-align: left;
    font-weight: bold;
}

.current-clip-meta {
    margin-bottom: .7em;
}

.current-clip-progress {
    top: 80%;
    margin-top: .2em;
}

.control-button:hover {
    background-image: linear-gradient(#3b4046, #2c3034 60%, #24272a) !important;
}

.control-button-play {
    color: #43c32e;
}

.is-playing {
    box-shadow: 0 0 15px  #43c32e;
}

.control-button-stop {
    color: #d01111;
}
.control-button-reload {
    color: #ed7c06;
}
.control-button-restart {
    color: #f6e502;
}

@media (max-width: 1555px) {
    .control-col {
        height: 100%;
        min-height: 294px;
    }
    .status-col {
        padding-right: 0;
        height: 100%;
    }
    .time-str {
        font-size: 3.5em;
    }
    .time-col {
        margin-bottom: 6px;
    }
    .control-unit-row {
        margin-right: -30px;
    }
    .control-unit-col {
        flex: 0 0 66.6666666667%;
        max-width: 66.6666666667%;
        margin: 6px 0 0 0;
    }
}

@media (max-width: 1225px) {
    .clock-col {
        margin-right: 0;
    }

    .counter-col {
        margin-left: 0;
    }
}

.list-row {
    height: calc(100% - 40px - 254px - 46px - 70px);
    min-height: 300px;
}

.pane-row {
    margin: 0;
}

.playlist-container {
    width: 100%;
    height: 100%;
}

.timecode {
    min-width: 56px;
    max-width: 90px;
}

.playlist-input {
    min-width: 35px;
    max-width: 60px;
}

.timecode input {
    border-color: #515763;
}

.list-group-header {
    height: 47px;
}

.playlist-list-group, #playlist-group {
    height: 100%;
}

#scroll-container {
    height: calc(100% - 47px);
}

.playlist-item {
    height: 52px;
}

.playlist-item:nth-of-type(even), .playlist-item:nth-of-type(even) div .timecode input {
    background-color: #3b424a;
}

.playlist-item:nth-of-type(even):hover {
    background-color: #1C1E22;
}

.clip-progress {
    height: 5px;
    padding-top: 3px;
}

.active-playlist-clip {
    background-color: #565e6a !important;
}

</style>

<style>
.copy-program {
    width: 302px !important;
}
</style>
