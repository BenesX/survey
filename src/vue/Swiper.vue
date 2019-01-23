<template>
    <div class="v-swiper-wrapper" :style="{height: height + 'px'}">
        <div class="v-swiper-mask" @touchstart="touchs" @touchmove="touchm" @touchend="touche"></div>
        <ul class="v-swiper-container"
            :style="{transform: 'translate3d(0, ' + moveDistance + 'px, 0)', 'transition-duration': duration + 's'}" >
            <li v-for='(item, index) in localVisibleChoices'
              class="v-swiper-item"
              :style="{height: itemHeight + 'px', lineHeight: itemHeight + 'px'}"
              :class="currentIndex == index ? 'active' : ''"
              :key="item.value"
            >
                {{ item.text || item.placeHolder }}
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Watch, prop } from "vue-property-decorator";
import { default as QuestionVue } from './question';
import { QuestionDropdownModel } from "../question_dropdown";
import Vue from "vue";

@Component
export class Swiper extends QuestionVue<QuestionDropdownModel> {

    @Prop()
    level: number;

    name:string = "Swiper";
    height: number = 180;
    amount: number = 5;
    minY = 0;
    maxY = 0;
    startY = 0;
    moveDistance = 0;
    duration = 0;
    itemHeight = 0;
    currentIndex = 0;
    cachePreIndex = 0;
    localVisibleChoices:Array<any> = [];
    text:string = '';

    get value () {
        if (!this.question.isEmpty()) {
            return this.question.value;
        }
        this.text = '';
        return "";
        // return !this.question.isEmpty() ? this.question.value : "";
    }

    set value(newVal) {
        this.question.value = newVal === "" ? undefined : newVal;
    }

    created () {
        // 插入placeholder
        if (this.question.optionsCaption) {
            this.localVisibleChoices.push({
                value: '',
                placeHolder: this.question.optionsCaption
            });
        }
        this.computeInitSelectedData();
        this.computeCompData();
        this.computeCompOffset();
        this.noticeSelectorToShowRes();
    }

    @Watch('question.visibleChoices')
    onItemsChange () {
        if (this.question.visibleChoices.length <=0) {
            this.value = '';
            this.text = '';
        }
        this.computeInitSelectedData();
        this.computeCompOffset();
        this.noticeSelectorToShowRes();
    }

    noticeSelectorToShowRes () {
        this.$emit('select', { text: this.text, level: this.level, value: this.value});
    }

    // 根据初始值value得到下标，选中所选条目
    computeInitSelectedData () {
        this.localVisibleChoices.splice(1);
        this.currentIndex = 0;
        this.moveDistance = this.minY;
        this.localVisibleChoices = this.localVisibleChoices.concat(this.question.visibleChoices);
        for (let i = 0; i < this.localVisibleChoices.length; i++) {
            if (this.localVisibleChoices[i].value == this.value) {
                this.currentIndex = i
                this.text = this.localVisibleChoices[i].text;
                break;
            }
        }
    }

    // 根据配置生成一些样式配置
    computeCompData () {
        this.itemHeight = this.height / this.amount;
        this.minY = this.moveDistance = Math.floor(this.amount / 2) * this.itemHeight;
    }

    // 计算依赖于组件初始值的样式
    computeCompOffset () {
        this.maxY = -(this.question.visibleChoices.length + 1 - Math.ceil(this.amount / 2)) * this.itemHeight;
        this.moveDistance = this.moveDistance - this.currentIndex * this.itemHeight;
    }

    touchs (e:any) {
        this.duration = 0;
        this.cachePreIndex = this.currentIndex;
        this.startY = e.touches[0].clientY;
    }

    touchm (e:any) {
        e.preventDefault();
        this.moveDistance += -1 * (this.startY - e.touches[0].clientY);
        this.startY = e.touches[0].clientY;
        this.currentIndex = Math.abs(Math.round(this.moveDistance / this.itemHeight - this.minY / this.itemHeight));
    }

    touche (e:any) {
        this.duration = 0.3;
        this.correctSelectItem();
    }

    correctSelectItem () {
        if (this.moveDistance > this.minY) {
            this.moveDistance = this.minY;
        } else if (this.moveDistance < this.maxY) {
            this.moveDistance = this.maxY;
        } else {
            const ratio = this.moveDistance / this.itemHeight;
            this.moveDistance = Math.round(ratio) * this.itemHeight;
        }
        this.currentIndex = Math.abs(Math.round(this.moveDistance / this.itemHeight - this.minY / this.itemHeight));
        if (this.cachePreIndex != this.currentIndex) {
            if (this.localVisibleChoices[this.currentIndex]) {
                this.value = this.localVisibleChoices[this.currentIndex].value;
                this.text = this.localVisibleChoices[this.currentIndex].text;
            } else {
                this.value = '';
                this.text = '';
            }
            this.noticeSelectorToShowRes();
        }
    }

}
Vue.component("Swiper", Swiper);
export default Swiper;
</script>

<style lang="scss">

</style>

