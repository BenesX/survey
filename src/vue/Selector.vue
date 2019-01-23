<template>
<div>
    <div @click="noticePanelToSwitchSelector">
        <input type="text" disabled :value="selectedList.join(' ')" class="form-control" style="background:none" :placeholder="row.optionsCaption"/>
    </div>
    <transition name="fade-in">
        <div class="v-city-masker" v-show="show" @click="noticePanelToSwitchSelector"></div>
    </transition>
    <transition name="slide-in">
        <div class="v-city-container" v-show="show">
            <div class="v-city-header">
                <div @click="noticePanelToSwitchSelector" class="v-city-btn">取消</div>
                <div class="v-city-btn" :class="canEmit ? 'active' : ''" @click="noticePanelToSwitchSelector">确认</div>
            </div>
            <div class="v-city-selector">
                <div class="v-time-selected" :style="{height: 194 / 5 + 'px'}"></div>
                <template v-if="row.elements">
                    <swiper
                        v-for="(element, index) in row.elements" 
                        :key="element.idValue" 
                        :id="element.id" 
                        :question="element"
                        :level="index"
                        class="v-city-swiper"
                        @select="selected"
                    />
                </template>
                <template v-else>
                    <swiper
                        :key="row.inputId" 
                        :question="row"
                        :level="0"
                        class="v-city-swiper"
                        @select="selected"
                    />
                </template>
            </div>
        </div>
    </transition>
</div>
</template>

<script lang="ts">
import { Component, Prop, Watch, prop } from "vue-property-decorator";
import Vue from "vue";
import Swiper from './Swiper.vue';

@Component({
    components: {
        Swiper
    }
})
export class Selector extends Vue {
    name:string = 'Selector';

    @Prop()
    show:boolean;

    @Prop()
    row:Array<any>;

    selectedList:Array<string> = [];

    get canEmit () {
        const matchSwiperVal = this.selectedList.filter(item => !!item )
        return matchSwiperVal.length > 0 &&
            matchSwiperVal.length === this.selectedList.length;
    }
    
    noticePanelToSwitchSelector () {
        this.$emit('toggleshow');
    }

    selected (emitData:any) {
        this.$set(this.selectedList, emitData.level, emitData.text);
    }
}

Vue.component("Selector", Selector);
export default Selector;
</script>

