
interface IActionType {
    type: string,
    payload: any
}

//функция возвращает булевое значение, выполнять ли ей следующую за ней функцию экшенов
export function isActionPending(action: IActionType) {
    return action.type.endsWith('pending')
}

export function isActionRejected(action: IActionType) {
    return action.type.endsWith('rejected')
}

//функция для возвращения названия экшена в виде строки user/fetchUserInfo/pending => fetchUserInfo
export function getActionName(actionType: string) { // [user, fetchUserInfo, pending]
    return actionType.split('/')[1]
}