export function adminOnly(req, res, next) {
  if (!req.session || !req.session.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

  if (!req.session || req.session.role !== "admin") {
    return res.status(403).json({ message: "Admins only" });
  }
  next();
}