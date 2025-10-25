import React from 'react'
import TaskSection from './TaskSection'
import ClauseSection from './ClauseSection';

export default function Tab({ campaign }) {
    const { tasks, contract } = campaign;
    return (
        <div className="tabs tabs-border">
            <input type="radio" name="campaignTabs" className="tab" aria-label="Tasks" defaultChecked />
            <div className="tab-content py-6">
                <TaskSection tasks={tasks} />
            </div>

            <input type="radio" name="campaignTabs" className="tab" aria-label="Contract" />
            <div className="tab-content py-6">
                <ClauseSection contractData={contract} />
            </div>

            {/* <input type="radio" name="campaignTabs" className="tab" aria-label="Tab 3" />
            <div className="tab-content border-base-300 bg-base-100 p-10">Tab content 3</div> */}
        </div>
    )
}
