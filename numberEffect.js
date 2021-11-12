 /**
     * nodeStr:cc.label节点
     * goalNum：目标值
     * times：倍数
     * fixedNum：保留小数位数
     * speed：变化的速度
     */
    //数字累积提升显示
    increase_num: function (nodeStr, goalNum, times, fixedNum, speed) {
        nodeStr.unscheduleAllCallbacks();
        if ((parseFloat(nodeStr.string - 0) * times) >= goalNum) {
            fixedNum = goalNum == 0 ? 0 : fixedNum;
            let current = (goalNum / times).toFixed(fixedNum)
            nodeStr.string = this.paddingZero(current, 9)
            return;
        }
        var diff = goalNum - parseFloat(nodeStr.string - 0) * times;
        if (!speed) {
            speed = 1;
        };
        nodeStr.schedule(function addNum() {
            let curNum = parseFloat(nodeStr.string - 0) * times
            let stepSize = Math.floor((diff * speed) / 40) + 1;
            curNum += (stepSize / 100);
            let curNum0 = (curNum / times).toFixed(fixedNum);
            nodeStr.string = this.paddingZero(curNum0, 9);
            if (curNum >= goalNum) {
                let curNum1 = (goalNum / times).toFixed(fixedNum);
                nodeStr.string = this.paddingZero(curNum1, 9);
                this.unschedule(addNum);
            }

        }.bind(this), 0.1);
    },

    //数字的累计降低显示
    reduce_num: function (nodeStr, goalNum, times, fixedNum, speed) {
        nodeStr.unscheduleAllCallbacks();
        if ((parseFloat(nodeStr.string - 0) * times) <= goalNum) {
            fixedNum = goalNum == 0 ? 0 : fixedNum;
            let current = (goalNum / times).toFixed(fixedNum)
            nodeStr.string = this.paddingZero(current, 10);
            return;
        }
        var diff = parseFloat(nodeStr.string - 0) * times - goalNum;
        if (!speed) {
            speed = 1
        };
        nodeStr.schedule(function delNum() {
            let curNum = parseFloat(nodeStr.string - 0) * times;
            let stepSize = Math.floor((diff * speed) / 40) + 1;
            curNum -= (stepSize / 100);
            let curNum0 = (curNum / times).toFixed(fixedNum);
            nodeStr.string = this.paddingZero(curNum0, 9)
            if (curNum <= goalNum) {
                let curNum1 = (goalNum / times).toFixed(fixedNum);
                nodeStr.string = this.paddingZero(curNum1, 9)
                this.unschedule(delNum);
            }
        }.bind(this), 0.1);
    },