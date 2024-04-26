export const stateText = [
  { id: "", text: " " },
  { id: "0", text: "回答" },
  { id: "1", text: "取り下げ" },
  { id: "2", text: "反訴への回答" },
  { id: "3", text: "交渉" },
  { id: "4", text: "手続き中止" },
  { id: "5", text: "和解成立" },
  { id: "6", text: "調停人指名" },
  { id: "7", text: "調停" },
  { id: "8", text: "仲裁人指名" },
  { id: "9", text: "仲裁" },
  { id: "10", text: "裁定成立" },
  { id: "11", text: "調停和解" },
  { id: "12", text: "和解不成立" },
  { id: "99", text: "その他" }];
export const checkBoxData = [{ id: "1", name: "申立人" },{ id: "2", name: "相手方" },{ id: "3", name: "調停人" }]
export const SNACKS26_1 = 'SnackS26-1';
export const SNACKS26_2 = 'SnackS26-2';
export const SNACKS27_1 = 'SnackS27-1';
export const SNACKS27_2 = 'SnackS27-2';
export const SNACKS27_3 = 'SnackS27-3';
export const SNACKS33_1 = 'SnackS33-1';
export const SNACKS33_2 = 'SnackS33-2';
export const SNACKS14_1 = 'SnackS14-1';
export const SNACKS24_1 = 'SnackS24-1';
export const SNACKS25_1 = 'SnackS25-1';
export const SNACKS25_2 = 'SnackS25-2';
export const SNACKS28S29 = '0';
export const SNACK_MESSAGE_S28 = '5';
export const SNACK_MESSAGE_S29 = '6';
export const S29_DateCompare = '現在の終了日より以降の日付を入力ください';
export const MESSAGE_NULLFLG = '5555555';
// 申立ての取り下げDialog btn1 btn2
export const PROPOSALTAKEDOWN_1 = 'ProposalTakeDown-1';
export const PROPOSALTAKEDOWN_2 = 'ProposalTakeDown-2';
// 個別やりとりの承諾依頼を確認Dialog btn1 btn2
export const PROMISEVERIFY_1 = 'PromiseVerify-1';
export const PROMISEVERIFY_2 = 'PromiseVerify-2';
// 指名を辞退するDialog btn1 btn2
export const DISMISSBYNAME_1 = 'DismissByName-1';
export const DISMISSBYNAME_2 = 'DismissByName-2';
// 調停人を辞任するDialog btn1 btn2
export const DISMISSBYMEDIATE_1 = 'DismissByMediate-1';
export const DISMISSBYMEDIATE_2 = 'DismissByMediate-2';
export const SNACKS19_1 = 'SnackS19-1';
export const SNACKS19_2 = 'SnackS19-2';
//CheckBox内容
export const CHECKBOXS17_1 = 'テスト削除します';
export const CHECKBOXS17_2 = '商品交換';
export const CHECKBOXS17_3 = '全額返金';
export const CHECKBOXS17_4 = '一部返金';
export const CHECKBOXS17_5 = '代行品発送';
export const CHECKBOXS17_6 = 'その他';
export const FROMHELPTEXTS17 = '「その他」の内容の記載をお願い致します。';
export const SNACKS17_1 = '相手方に和解案の編集依頼を提出しました。';
export const OPTIONSS17_1 = '下書き保存';
export const OPTIONSS17_2 = '保存して編集を依頼';
export const TXTS17_1 = '対応方法';
export const TXTS17_2 = '和解の内容について、お答えください。';
export const SPANS17_2_1 = '申立て支払金額';
export const SPANS17_2_2 = '反訴支払い金額';
export const SPANS17_2_3 = '支払い期日';
export const SPANS17_2_4 = '返送時送料';
export const SPANS17_2_5 = '特記事項';
export const SPANS17_2_6 = '添付資料';
export const MUSTINPUTTXTS17 = '必填';
export const NOMUSTINPUTTXTS17 = '任意';
export const RADIOS17_2_1 = '申立人が支払う';
export const RADIOS17_2_2 = '相手方が支払う';
export const RADIOS17_2_3 = '返送なし';
export const BUTTONS17_1_1 = '次へ';
export const BUTTONS17_2_1 = '和解案を作成';
export const BUTTONS17_2_2 = '戻る';
export const CANCEL_SNACK_S32 = '0';
export const SNACK_MESSAGE_S32 = '7';
export const BUTTONS20_1 = '合意する';
export const BUTTONS20_2 = '確認済みにする';

export const msgSnackList = [
    { msgId: SNACKS26_2, message: "期日延長の承諾依頼を提供しました。" },
    { msgId: SNACKS27_2, message: "期日の延長希望を却下しました。" },
    { msgId: SNACKS27_3, message: "期日の延長希望を承諾しました。" },
    { msgId: SNACK_MESSAGE_S28, message: "移行フェーズへ移行しました。" },
    { msgId: SNACK_MESSAGE_S29, message: "期日が延長されました。" },
    { msgId: PROPOSALTAKEDOWN_2, message: "取り下げが行われました。"},
    { msgId: PROMISEVERIFY_2, message: "依頼を承諾しました。"},
    { msgId: DISMISSBYNAME_2, message: "調停人の指名を辞退しました。"},
    { msgId: DISMISSBYMEDIATE_2, message: "調停人を辞任しました。"},
    { msgId: SNACKS33_1, message: "指名を受理しました。"},
    { msgId: SNACKS33_2, message: "申立て番号40000008の調停人を辞任しました。"},
    { msgId: SNACKS24_1, message: "調停案を提出しました。"},
    { msgId: SNACKS25_1, message: "和解合意書を確認済みにしました。"},
    { msgId: SNACKS25_2, message: "合意を行いました。"},
    { msgId: SNACKS19_1, message: "和解案を提出しました。"},
    { msgId: SNACKS19_2, message: "別のユーザが更新を行ったため更新できませんでした。"},
    { msgId: SNACK_MESSAGE_S32, message: "取り下げが行われました。"},
    { msgId: BUTTONS20_1, message: "合意を行いました。"},
    { msgId: BUTTONS20_2, message: "和解案合意書を確認済みにしました。"},
    { msgId: SNACKS14_1, message: "下書きを保存しました。"}
]
    ;