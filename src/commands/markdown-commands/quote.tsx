import * as React from "react";
import { Command } from "../command";
import { textHelpers } from "../../helpers/textHelpers";

export const quote: Command = {
  execute: ({ initialState, textApi }) => {
    // Adjust the selection to encompass the whole word if the caret is inside one
    const newSelectionRange = textHelpers.selectWord({
      text: initialState.text,
      selection: initialState.selection
    });
    const state1 = textApi.setSelectionRange(newSelectionRange);

    const breaksBeforeCount = textHelpers.getBreaksNeededForEmptyLineBefore(
      state1.text,
      state1.selection.start
    );
    const breaksBefore = Array(breaksBeforeCount + 1).join("\n");

    const breaksAfterCount = textHelpers.getBreaksNeededForEmptyLineAfter(
      state1.text,
      state1.selection.end
    );
    const breaksAfter = Array(breaksAfterCount + 1).join("\n");

    // Replaces the current selection with the quote mark up
    textApi.replaceSelection(
      `${breaksBefore}> ${textHelpers.getSelectedText(state1)}${breaksAfter}`
    );

    const selectionStart = state1.selection.start + breaksBeforeCount + 2;
    const selectionEnd =
      selectionStart + textHelpers.getSelectedText(state1).length;

    textApi.setSelectionRange({
      start: selectionStart,
      end: selectionEnd
    });
  }
};