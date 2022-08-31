export let modalWrap = null;
export const showModal = (title , description, yesBtnLabel = 'Yes', noBtnLabel = 'Cancel', callback) => {
    if (modalWrap !== null) {
      modalWrap.remove();
    }
  
    modalWrap = document.createElement('div');
    modalWrap.innerHTML = `
      <div class="modal fade" tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header bg-light">
              <h5 class="modal-title">Edit movie</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
            Title: <input id="titleInput" type="text">
            Rating: <input id="ratingInput" type="text">
            Genre: <input id="genreInput" type="text">
            </div>
            <div class="modal-footer bg-light">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button id="saveBtn" type="button" class="btn btn-primary modal-success-btn" data-bs-dismiss="modal">Save</button>
            </div>
          </div>
        </div>
      </div>
    `;
  
    modalWrap.querySelector('.modal-success-btn').onclick = callback;
  
    document.body.append(modalWrap);
  
    var modal = new bootstrap.Modal(modalWrap.querySelector('.modal'));
    modal.show();
  }