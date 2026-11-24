import { Link } from 'react-router'

function VendorCard({ vendor }) {
  return (
    // The Link wraps the whole card so it navigates to /vendor/:id
    <Link to={`/vendor/${vendor.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      
      {/* Assuming your CSS uses 'vendor-card' and 'card' classes. 
          If your old code used a different className, you can change it here. */}
      <div className="vendor-card card">
        <h3>{vendor.name}</h3>
        
        {/* If your old card had a description or rating, keep it here! */}
        {vendor.description && <p>{vendor.description}</p>}
      </div>

    </Link>
  )
}

export default VendorCard