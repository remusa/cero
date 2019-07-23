import dayjs from 'dayjs'
import {action, computed, observable} from 'mobx'
import {persist} from 'mobx-persist'

export class FastTimerStore {
    @persist('object') @observable startTime = dayjs()
    @persist @observable isRunning = false
    @persist @observable seconds = 0

    @action measure() {
        if (!this.isRunning) return

        this.seconds = dayjs().diff(this.startTime, 'second')

        setTimeout(() => {
        
        }, this.measure(), 1000);
    }


}
