/**
 * Gear Sidebar JavaScript
 * Handles the gear selection sidebar functionality for the gear planner
 */

// Parse gear options from the JSON script tag
const gearOptions = JSON.parse(document.getElementById('gear-options').textContent);

/**
 * Update the sidebar for a specific gear slot
 * @param {string} slot - The gear slot to update the sidebar for
 */
function updateSidebar(slot) {
    // Set the slot icon
    const icon = document.getElementById('sidebar-slot-icon');
    icon.src = `/static/icons/${slot.replace('1','').replace('2','')}.png`;
    icon.alt = slot;

    // Generate dropdown options
    const dropdownContainer = document.getElementById('sidebar-dropdown-container');
    const options = gearOptions[slot] || [];
    let html = `<select id="gear-dropdown" data-slot="${slot}" style="width:100%;padding:6px 8px;font-size:0.97rem;">`;
    html += `<option value="None">None</option>`;
    options.forEach(opt => {
        html += `<option value="${opt.name}" data-icon="${opt.icon}">${opt.name}</option>`;
    });
    html += `</select>`;
    dropdownContainer.innerHTML = html;

    // Clear upgrade buttons container when no item is selected
    document.getElementById('upgrade-levels-container').innerHTML = '';

    // Clear any existing stats when switching to a different slot
    let oldStats = document.querySelector('.sidebar-content .gear-stats');
    if (oldStats) oldStats.remove();

    const dropdown = document.getElementById('gear-dropdown');
    
    // Set dropdown value based on stored gearState
    // Check if gearState exists and has the selected gear for this slot
    if (typeof window.gearState !== 'undefined' && window.gearState && window.gearState.selectedGear && window.gearState.selectedGear[slot]) {
        const selectedItem = window.gearState.selectedGear[slot];
        dropdown.value = selectedItem;
        if (typeof renderUpgradeButtons === 'function') {
            renderUpgradeButtons(slot, selectedItem, window.gearState.enhancementLevels[slot]);
        }
    } else {
        document.getElementById('upgrade-levels-container').innerHTML = '';
    }

    // Add change event listener to dropdown
    dropdown.addEventListener('change', function() {
        const selected = this.options[this.selectedIndex];
        const iconPath = selected.getAttribute('data-icon');
        const slotName = this.getAttribute('data-slot');
        
        // Clear any existing stats when dropdown changes
        let oldStats = document.querySelector('.sidebar-content .gear-stats');
        if (oldStats) oldStats.remove();
        
        // Update gear icon
        if (iconPath && iconPath !== 'None') {
            document.getElementById('gear-img-' + slotName).src = '/static/icons/' + iconPath;
        } else {
            document.getElementById('gear-img-' + slotName).src = `/static/icons/${slotName.replace('1','').replace('2','')}.png`;
        }
        
        // Show upgrade buttons if item is selected
        if (this.value !== 'None') {
            if (typeof renderUpgradeButtons === 'function') {
                renderUpgradeButtons(slotName, this.value);
            }
        } else {
            // Clear everything when "None" is selected
            document.getElementById('upgrade-levels-container').innerHTML = '';
            if (window.gearState) {
                window.gearState.selectedGear[slotName] = null;
                window.gearState.enhancementLevels[slotName] = null;
                window.gearState.currentStats[slotName] = null;
                if (typeof updateTotalStats === 'function') {
                    updateTotalStats();
                }
            }
        }
    });
}

/**
 * Initialize the gear planner functionality
 * Sets up event listeners for gear slots and shows default slot
 */
function initializeGearPlanner() {
    // Add click event listeners to all gear slots
    document.querySelectorAll('.gear-slot').forEach(el => {
        el.addEventListener('click', function() {
            updateSidebar(this.getAttribute('data-slot'));
        });
    });
    
    // Show main_weapon by default
    updateSidebar('main_weapon');
}

// Initialize with a small delay to ensure gearState is available
setTimeout(initializeGearPlanner, 100);

/**
 * Close the gear sidebar
 * Removes the 'open' class from the sidebar
 */
window.closeSidebar = function() {
    document.getElementById('gear-sidebar').classList.remove('open');
} 