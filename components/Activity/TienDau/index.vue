<script setup lang="ts">
import { randomNumber } from '~/common'
import { tips } from '~/constants'

const { sid, playerInfo } = storeToRefs(usePlayerStore())
const refreshArena = useState('refreshArena')
const { data: ranks, pending, refresh } = useFetch<any>('/api/arena/tienDau')
const options = reactive({
  sid: '',
  toggle: false,
  tooltip: false,
})

watch(refreshArena, () => {
  refresh()
})
const playerPreview = (sid: string) => {
  if (!sid)
    return

  options.toggle = true
  options.sid = sid
}

const reachLimit = computed(() => ranks.value.reachLimit?.remaining >= ranks.value.reachLimit?.maximum)
</script>

<template>
  <player-preview
    :sid="options.sid"
  />
  <var-popup v-model:show="options.tooltip">
    <div
      border="1 white/40 rounded"
      p="4"
      bg="[#000000]"
      font="leading-6"
    >
      <p>Hoạt đông tiên đấu sẽ diễn ra cả ngày từ thứ 2 đến chủ nhật hằng tuần</p>
      <p>Các đạo hữu sẽ lựa chọn các đối thủ để tham gia cướp điểm</p>
      <p>Mỗi lượt chiến thắng sẽ được +10 điểm, thua +4 điểm</p>
      <p>Chiến thắng nhận 10 Tiên duyên 10 Điểm tiên đấu, thua nhận 5 điểm tương đương <i text="underline">(Dùng để mua vật phẩm trong shop tiên đấu)</i></p>
      <p>Top 1: Nhận 100 Tiên duyên & 100 Điểm tiên đấu</p>
      <p>Top 2: Nhận 70 Tiên duyên & 70 Điểm tiên đấu</p>
      <p>Top 3 - 5: Nhận 50 Tiên duyên & 50 Điểm tiên đấu</p>
      <p>Top 6 - 10: Nhận 30 Tiên duyên & 30 Điểm tiên đấu</p>
      <p>Top 11 - 50: Nhận 20 Tiên duyên & 20 Điểm tiên đấu</p>
      <p>Top 51 - 100: Nhận 10 Tiên duyên & 10 Điểm tiên đấu</p>
      <p>Điểm xếp hạng sẽ được reset và trao thưởng mỗi ngày vào lúc 4h sáng</p>
    </div>
  </var-popup>
  <var-loading :loading="pending" size="mini" :description="tips[Math.round(randomNumber(0, tips.length))]" color="#ffffff">
    <div v-if="pending" h="50" w="100" />
    <section
      v-else
      m="x-4 t-2"
      flex="~ "
      justify="between"
    >
      <div>Điểm Tiên Đấu: {{ playerInfo?.arenas?.tienDau?.score ?? 0 }}</div>
      <div>
        <div
          text="underline right"
          @click.stop="options.tooltip = true"
        >
          Thể thức
        </div>
        <div v-if="ranks?.reachLimit">
          Lượt: {{ ranks?.reachLimit?.remaining }}/{{ ranks?.reachLimit?.maximum }}
        </div>
      </div>
    </section>
    <div
      v-for="(rank, index) in ranks?.data"
      :key="rank._id"
      pos="relative"
      border="1 white/40 rounded"
      text="primary"
      p="2"
      m="x-4 y-2"
      :class="{
        '!border-green-400': sid === rank.sid,
      }"
    >
      <activity-tien-dau-item
        :rank="rank"
        :pos="index + 1"
        :reach-limit="reachLimit"
        @click.stop="playerPreview(rank.sid)"
      />
    </div>
  </var-loading>
</template>
