const reverseList = function(head) {
    let pre = undefined
    while (head) {
        const next = head.next
        head.next = pre
        pre = head
        head = next
    }
    return pre
};

export default reverseList
