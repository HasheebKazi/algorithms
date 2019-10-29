/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var mergeTwoLists = function(l1, l2) {

    let dummy = null;
    let temp = null;

    if (l1.val <= l2.val) {
        temp = l1;
        dummy = temp;
        l1 = temp.next;     
        dummy.next = null;
    } else {
        temp = l2;
        dummy = temp;
        l2 = temp.next; 
        dummy.next = null;

    }


    while(l1 && l2) {
        
        if (l1.val <= l2.val) {
            temp = l1;
            dummy.next = temp;
            l1 = temp.next;     
            dummy.next.next = null;
            break;
        } else {
            temp = l2;
            dummy.next = temp;
            l2 = temp.next;     
            dummy.next.next = null;
            break;
        }
        break;
    }

    console.log('dummy: ', dummy);
    console.log('list 1', l1);
    console.log('list 2', l2);
    
    return null;
};