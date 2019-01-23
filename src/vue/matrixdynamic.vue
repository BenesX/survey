<template>
    <div :style="{overflowX: question.horizontalScroll? 'scroll': ''}">
        <survey-matrixtable :question="question" />
        <div v-if="question.isAddRowOnTop" :class="question.cssClasses.footer">
            <div :class="question.cssClasses.buttonAddIcon" @click="addRowClick"></div>
            <input type="button" :class="question.cssClasses.button + ' ' + question.cssClasses.buttonAdd" :value="question.addRowText" @click="addRowClick"/>
        </div>
        <div v-if="question.isAddRowOnBottom" :class="question.cssClasses.footer">
            <div :class="question.cssClasses.buttonAddIcon" @click="addRowClick"></div>
            <input type="button" :class="question.cssClasses.button + ' ' + question.cssClasses.buttonAdd" :value="question.addRowText" @click="addRowClick"/>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { default as QuestionVue } from "./question";
import { QuestionMatrixDynamicModel } from "../question_matrixdynamic";
import { MatrixDropdownRowModelBase } from "../question_matrixdropdownbase";

@Component
export class MatrixDynamic extends QuestionVue<QuestionMatrixDynamicModel> {
  addRowClick() {
    this.question.addRow();
  }
}
Vue.component("survey-matrixdynamic", MatrixDynamic);
export default MatrixDynamic;
</script>
