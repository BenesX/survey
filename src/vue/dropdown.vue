<template>
    <div :class="question.cssClasses.root">
        <div v-if="!question.isReadOnly" :class="question.cssClasses.selectWrapper">
            <!-- <select :id="question.inputId" v-model="value" :class="question.cssClasses.control" v-bind:aria-label="question.locTitle.renderedHtml">
                <option value=''>{{question.optionsCaption}}</option>
                <option v-for="item in question.visibleChoices" :value="item.value" :disabled="!item.isEnabled">{{item.text}}</option>
            </select> -->
            <Selector :row="question" :show="isShowSelector" @toggleshow="toggleShow"/>
        </div>
        <div v-else :class="question.cssClasses.control">{{isOtherSelected ? question.otherText : question.displayValue}}</div>
        <survey-other-choice v-show="isOtherSelected" :question="question"/>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { default as QuestionVue } from "./question";
import { QuestionDropdownModel } from "../question_dropdown";
import Selector from './Selector.vue';

@Component({
    components: {
        Selector
    }
})

export class Dropdown extends QuestionVue<QuestionDropdownModel> {
  isShowSelector:boolean = false;
  get value() {
    return !this.question.isEmpty() ? this.question.value : "";
  }
  set value(newVal) {
    this.question.value = newVal === "" ? undefined : newVal;
  }

  get isOtherSelected() {
    const question = this.question;
    return question.hasOther && question.isOtherSelected;
  }

  toggleShow () {
      this.isShowSelector = !this.isShowSelector;
  }
}
Vue.component("survey-dropdown", Dropdown);
export default Dropdown;
</script>
