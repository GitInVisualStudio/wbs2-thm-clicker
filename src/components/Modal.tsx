import { ButtonHTMLAttributes } from "react";

export const Modal = ({
  title,
  children,
  save,
  ...props
}: {
  title: string;
  save: () => void;
} & ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <>
      {/* This code is super stupid but it does work */}
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#editModal"
        {...props}
      >
        {title}
      </button>

      <div
        className="modal fade"
        id="editModal"
        aria-labelledby="editModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="editModalLabel">
                {title}
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">{children}</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={save}
                data-bs-dismiss="modal"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
